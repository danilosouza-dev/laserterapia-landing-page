import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Mapeamento cidade → ID da lista de leads no Brevo
const CITY_LIST_MAP: Record<string, number> = {
  'porto-alegre': Number(process.env.BREVO_LIST_LEADS_POA) || 4,
  'curitiba': Number(process.env.BREVO_LIST_LEADS_CURITIBA) || 6,
  'salvador': Number(process.env.BREVO_LIST_LEADS_SALVADOR) || 8,
};

interface CaptureBody {
  email: string;
  phone: string;
  name?: string;
  cidade?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CaptureBody = await request.json();
    const { email, phone, name, cidade } = body;

    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email e telefone são obrigatórios' },
        { status: 400 }
      );
    }

    // Determinar lista de leads pela cidade (default: Porto Alegre)
    const cityKey = cidade?.toLowerCase().replace(/\s+/g, '-') || 'porto-alegre';
    const listId = CITY_LIST_MAP[cityKey] || CITY_LIST_MAP['porto-alegre'];

    // Preparar atributos do contato
    const firstName = name?.split(' ')[0] || '';
    const lastName = name?.split(' ').slice(1).join(' ') || '';

    // Criar ou atualizar contato no Brevo
    const contactPayload = {
      email,
      attributes: {
        NOME: firstName,
        SOBRENOME: lastName,
        PHONE: phone,
        CIDADE: cidade || 'Porto Alegre',
        STATUS: 'lead',
      },
      listIds: [listId],
      updateEnabled: true,
    };

    const contactResponse = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(contactPayload),
    });

    // Se contato já existe (204 ou 409), atualizar
    if (!contactResponse.ok && contactResponse.status !== 204) {
      const errorData = await contactResponse.json().catch(() => null);

      if (errorData?.code === 'duplicate_parameter') {
        // Contato já existe — atualizar e adicionar à lista
        await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            attributes: {
              PHONE: phone,
              CIDADE: cidade || 'Porto Alegre',
              STATUS: 'lead',
            },
          }),
        });

        // Adicionar à lista de leads
        await fetch(`${BREVO_API_URL}/contacts/lists/${listId}/contacts/add`, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({ emails: [email] }),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao capturar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
