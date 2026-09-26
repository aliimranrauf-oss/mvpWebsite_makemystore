import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

// ── POST /api/pos-leads ──────────────────────────────────────────────────
// Lead capture for /pos-system. Same pattern as /api/solar-leads and
// /api/orders:
//   1. Insert happens server-side with the service-role key (never expose
//      that key to the browser — see lib/supabaseAdmin.ts).
//   2. A honeypot field blocks obvious bots.
//   3. The Meta Pixel `Lead` event fires client-side (in LeadForm.tsx) only
//      after this route confirms the insert succeeded.
//
// Requires the `pos_leads` table — see sql/pos_leads.sql.

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot field: a real browser never fills this (hidden via CSS in the
  // form). Bots that auto-fill every field will trip it.
  if (body.website) {
    return NextResponse.json({ ok: true }) // pretend success, drop silently
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()

  if (!name || !email || !email.includes('@')) {
    return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 })
  }

  const lead = {
    name,
    email,
    phone: body.phone ? String(body.phone).trim() : null,
    business_type: body.businessType ? String(body.businessType).trim() : null,
    business_name: body.businessName ? String(body.businessName).trim() : null,
    message: body.message ? String(body.message).trim() : null,
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin.from('pos_leads').insert([lead]).select().single()
    if (error) throw error

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err: any) {
    console.error('POS lead creation failed:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
