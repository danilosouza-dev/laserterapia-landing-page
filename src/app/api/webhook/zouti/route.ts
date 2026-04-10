import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Mapeamento cidade → IDs das listas no Brevo
const CITY_LISTS: Record<string, { leads: number; compradores: number }> = {
  'porto alegre': {
    leads: Number(process.env.BREVO_LIST_LEADS_POA) || 4,
    compradores: Number(process.env.BREVO_LIST_COMPRADORES_POA) || 5,
  },
  'curitiba': {
    leads: Number(process.env.BREVO_LIST_LEADS_CURITIBA) || 6,
    compradores: Number(process.env.BREVO_LIST_COMPRADORES_CURITIBA) || 7,
  },
  'salvador': {
    leads: Number(process.env.BREVO_LIST_LEADS_SALVADOR) || 8,
    compradores: Number(process.env.BREVO_LIST_COMPRADORES_SALVADOR) || 9,
  },
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    console.log('[Webhook Zouti] Recebido:', JSON.stringify(payload, null, 2));

    // Extrair dados do payload da Zouti
    // Nota: O formato exato pode variar — ajuste conforme o payload real capturado via webhook.site
    const data = payload.data || payload;
    const customer = data.customer || data;
    const email = customer.email;
    const status = (data.status || payload.event || '').toUpperCase();
    const productName = data.product?.name || data.productName || '';

    if (!email) {
      console.error('[Webhook Zouti] Email não encontrado no payload');
      return NextResponse.json({ error: 'Email não encontrado' }, { status: 400 });
    }

    // Identificar a cidade pelo nome do produto
    const lists = identifyCityLists(productName);

    switch (status) {
      case 'ACTIVE':
      case 'APPROVED':
      case 'PAYMENT.APPROVED':
      case 'PAID': {
        console.log(`[Webhook Zouti] Compra aprovada: ${email}`);

        if (lists) {
          // Remover da lista de leads
          await removeFromList(email, lists.leads);
          // Adicionar à lista de compradores
          await addToList(email, lists.compradores);
        }

        // Atualizar atributos do contato
        await updateContact(email, {
          STATUS: 'comprador',
          DATA_COMPRA: new Date().toISOString().split('T')[0],
          VALOR_PAGO: data.product?.amount
            ? data.product.amount / 100
            : data.amount
              ? data.amount / 100
              : 0,
          TURMA: productName,
        });
        break;
      }

      case 'REFUNDED':
      case 'REFUND': {
        console.log(`[Webhook Zouti] Reembolso: ${email}`);
        if (lists) {
          await removeFromList(email, lists.compradores);
        }
        await updateContact(email, { STATUS: 'reembolsado' });
        break;
      }

      case 'CANCELLED':
      case 'CANCELED': {
        console.log(`[Webhook Zouti] Cancelamento: ${email}`);
        await updateContact(email, { STATUS: 'cancelado' });
        break;
      }

      case 'INCOMPLETE':
      case 'PENDING': {
        // Nenhuma ação — contato permanece na lista de leads
        // A automação do Brevo cuida do follow-up
        console.log(`[Webhook Zouti] Pagamento pendente: ${email}`);
        break;
      }

      default: {
        console.log(`[Webhook Zouti] Status não mapeado: ${status}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Webhook Zouti] Erro:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// ─── Funções auxiliares ─────────────────────────────────────

function identifyCityLists(productName: string) {
  const normalized = productName.toLowerCase();
  for (const [city, lists] of Object.entries(CITY_LISTS)) {
    if (normalized.includes(city)) {
      return lists;
    }
  }
  // Fallback: Porto Alegre
  return CITY_LISTS['porto alegre'];
}

async function addToList(email: string, listId: number) {
  try {
    await fetch(`${BREVO_API_URL}/contacts/lists/${listId}/contacts/add`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({ emails: [email] }),
    });
    console.log(`[Brevo] Adicionado ${email} à lista ${listId}`);
  } catch (error) {
    console.error(`[Brevo] Erro ao adicionar à lista ${listId}:`, error);
  }
}

async function removeFromList(email: string, listId: number) {
  try {
    await fetch(`${BREVO_API_URL}/contacts/lists/${listId}/contacts/remove`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({ emails: [email] }),
    });
    console.log(`[Brevo] Removido ${email} da lista ${listId}`);
  } catch (error) {
    console.error(`[Brevo] Erro ao remover da lista ${listId}:`, error);
  }
}

async function updateContact(email: string, attributes: Record<string, unknown>) {
  try {
    await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({ attributes }),
    });
    console.log(`[Brevo] Atualizado contato ${email}:`, attributes);
  } catch (error) {
    console.error(`[Brevo] Erro ao atualizar contato ${email}:`, error);
  }
}
