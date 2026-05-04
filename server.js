const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// ===== EMAIL TRANSPORTER (Gmail SMTP) =====
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ===== SEND RECEIPT EMAIL =====
app.post('/api/send-receipt', async (req, res) => {
  try {
    const { orderRef, customerName, customerEmail, customerAddress, items, total, bankDetails } = req.body;

    if (!customerEmail || !orderRef) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px;">${item.name}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-size: 14px; color: #666;">${item.storage} · ${item.color}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; text-align: center; font-size: 14px;">${item.qty}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; text-align: right; font-size: 14px; font-weight: 600;">€${(item.price * item.qty).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: `"iStore Stock" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Rechnung — Bestellung ${orderRef}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; background: #f5f5f7; margin: 0; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 20px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 800;">iStore<span style="color: #60a5fa;">Stock</span></h1>
              <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 14px;">Rechnung / Bestellbestätigung</p>
            </div>
            
            <!-- Greeting -->
            <div style="padding: 30px;">
              <p style="font-size: 16px; margin: 0;">Hallo <strong>${customerName}</strong>,</p>
              <p style="color: #666; margin: 8px 0 0; font-size: 14px;">vielen Dank für deine Bestellung! Hier ist deine Rechnung.</p>
              
              <!-- Order Info -->
              <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                  <tr><td style="color: #888; padding: 6px 0;">Bestellnummer</td><td style="font-weight: 700; text-align: right; color: #0071e3;">${orderRef}</td></tr>
                  <tr><td style="color: #888; padding: 6px 0;">Datum</td><td style="text-align: right;">${new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</td></tr>
                  <tr><td style="color: #888; padding: 6px 0;">Zahlungsmethode</td><td style="text-align: right;">Banküberweisung</td></tr>
                  <tr><td style="color: #888; padding: 6px 0;">Status</td><td style="text-align: right; color: #f59e0b; font-weight: 600;">Warten auf Zahlung</td></tr>
                </table>
              </div>

              <!-- Items -->
              <h3 style="font-size: 16px; margin: 28px 0 12px; font-weight: 700;">Artikel</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                  <tr style="background: #f8f9fa;">
                    <th style="padding: 10px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Produkt</th>
                    <th style="padding: 10px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Variante</th>
                    <th style="padding: 10px 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Menge</th>
                    <th style="padding: 10px 12px; text-align: right; font-weight: 600; border-bottom: 2px solid #eee; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              
              <!-- Total -->
              <div style="background: linear-gradient(135deg, #eff6ff, #f0f9ff); border-radius: 12px; padding: 18px 24px; margin: 24px 0; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 16px; font-weight: 600;">Gesamt</span>
                <span style="font-size: 28px; font-weight: 900; color: #0071e3;">€${total.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
              </div>

              <!-- Bank Transfer -->
              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <h4 style="margin: 0 0 14px; color: #92400e; font-size: 15px;">🏦 Banküberweisung</h4>
                <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.8;">
                  Bitte überweise den Betrag innerhalb von <strong>7 Tagen</strong> an:<br>
                  <strong>Kontoinhaber:</strong> ${bankDetails.accountHolder}<br>
                  <strong>IBAN:</strong> <span style="font-family: monospace;">${bankDetails.iban}</span><br>
                  <strong>BIC:</strong> <span style="font-family: monospace;">${bankDetails.bic}</span><br>
                  <strong>Bank:</strong> ${bankDetails.bankName}<br>
                  <strong>Verwendungszweck:</strong> <span style="color: #1d4ed8; font-weight: 800; font-size: 14px;">${orderRef}</span><br>
                  <strong>Betrag:</strong> €${total.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                </p>
              </div>

              <!-- Shipping -->
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; margin: 24px 0;">
                <p style="margin: 0; color: #166534; font-size: 13px; line-height: 1.6;">🚚 <strong>Kostenloser Versand</strong> — Lieferung innerhalb von 7 Werktagen nach Zahlungseingang via DHL, Hermes oder DPD.</p>
              </div>

              <!-- Address -->
              <div style="background: #f8f9fa; border-radius: 12px; padding: 16px 20px; margin: 24px 0;">
                <h4 style="margin: 0 0 8px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Lieferadresse</h4>
                <p style="margin: 0; font-size: 14px; white-space: pre-line; line-height: 1.6;">${customerAddress}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #888; font-size: 12px; margin: 0;">© 2025 iStore Stock. Alle Rechte vorbehalten.</p>
              <p style="color: #aaa; font-size: 11px; margin: 4px 0 0;">istore-stock@shop.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`  📧 Rechnung gesendet an: ${customerEmail}`);
    res.json({ success: true, message: 'Receipt sent successfully' });
  } catch (error) {
    console.error('  ❌ Email error:', error.message);
    res.status(500).json({ error: 'Failed to send receipt email', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;

// ===== ALL ROUTES → index.html =====
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  🚀 iStore Stock Server läuft!');
  console.log(`  📍 http://localhost:${PORT}`);
  console.log('  🏦 Zahlung per Banküberweisung (IBAN)');
  console.log('  📧 Email-Rechnung aktiviert');
  console.log('');
});