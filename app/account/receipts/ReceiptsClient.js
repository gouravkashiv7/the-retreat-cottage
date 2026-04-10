"use client";
import { useState } from "react";
import {
  Receipt,
  Download,
  Calendar,
  Home,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
} from "lucide-react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function ReceiptsClient({ bookings }) {
  const [expandedId, setExpandedId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  // PDF-safe currency formatter (jsPDF helvetica can't render ₹)
  const pdfCurrency = (amount) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `Rs. ${formatted}`;
  };

  const handleDownload = async (booking) => {
    setDownloadingId(booking.id);

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pw = doc.internal.pageSize.getWidth(); // 210
      const accomNames = getAccommodationNames(booking);
      const ordersTotal = getOrdersTotal(booking.orders);
      const grandTotal = (booking.totalPrice || 0) + ordersTotal;
      const leftM = 20;
      const rightM = 190;

      // ── Colors ──
      const C = {
        navy:  [20, 28, 36],
        gold:  [198, 153, 99],
        text:  [40, 44, 52],
        sub:   [110, 110, 118],
        line:  [220, 220, 224],
        bg:    [248, 248, 250],
        white: [255, 255, 255],
      };

      // ── Gold accent stripe at top ──
      doc.setFillColor(...C.gold);
      doc.rect(0, 0, pw, 3, "F");

      // ── Logo ──
      const img = new Image();
      img.src = "/logo-dark.png";
      await new Promise((r) => { img.onload = r; img.onerror = r; });
      if (img.complete && img.naturalWidth > 0) {
        doc.addImage(img, "PNG", leftM, 10, 18, 18);
      }

      // ── Company Name ──
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(...C.navy);
      doc.text("The Retreat Cottage", 42, 19);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...C.sub);
      doc.text("Boutique Mountain Stay  |  Dharampur, Himachal Pradesh  |  www.retreatcottage.in", 42, 24);

      // ── INVOICE / RECEIPT label (right-aligned, separate row) ──
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...C.gold);
      doc.text("INVOICE / RECEIPT", rightM, 36, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...C.sub);
      doc.text(`#${booking.id}  |  Downloaded: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`, rightM, 41, { align: "right" });

      // ── Divider ──
      doc.setDrawColor(...C.line);
      doc.setLineWidth(0.4);
      doc.line(leftM, 46, rightM, 46);

      // ── Two-column info section ──
      let y = 56;

      // Left column — Bill To
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...C.gold);
      doc.text("BILL TO", leftM, y);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...C.navy);
      doc.text(booking.guests?.fullName || "Guest", leftM, y + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...C.sub);
      doc.text("Verified Guest", leftM, y + 11);

      // Right column — Stay Details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...C.gold);
      doc.text("STAY DETAILS", 120, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...C.text);
      const details = [
        `Accommodation:  ${accomNames.join(", ") || "—"}`,
        `Period:  ${formatDate(booking.startDate)} — ${formatDate(booking.endDate)}`,
        `Duration:  ${booking.numNights} Night(s)  ·  ${booking.numGuests} Guest(s)`,
      ];
      details.forEach((line, i) => {
        doc.text(line, 120, y + 6 + i * 5);
      });

      // ── Status badge ──
      doc.setFillColor(...C.gold);
      doc.roundedRect(rightM - 22, y - 2, 22, 6, 1, 1, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(...C.white);
      doc.text("SETTLED", rightM - 11, y + 2.5, { align: "center" });

      // ── Charges Table ──
      y = 85;

      // Table header
      doc.setFillColor(...C.navy);
      doc.rect(leftM, y, rightM - leftM, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...C.white);
      doc.text("DESCRIPTION", leftM + 4, y + 5.5);
      doc.text("AMOUNT (Rs.)", rightM - 4, y + 5.5, { align: "right" });

      y += 14;

      // ── Row helper ──
      const addRow = (label, amount, opts = {}) => {
        if (y > 265) { doc.addPage(); y = 20; }
        const { bold, indent, color, size } = { bold: false, indent: 0, color: C.text, size: 8.5, ...opts };
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(size);
        doc.setTextColor(...color);
        doc.text(label, leftM + 4 + indent, y);
        if (amount !== null) {
          doc.text(pdfCurrency(amount), rightM - 4, y, { align: "right" });
        }
        // Subtle row line
        doc.setDrawColor(...C.line);
        doc.setLineWidth(0.15);
        doc.line(leftM, y + 3, rightM, y + 3);
        y += 7;
      };

      // Stay charges
      addRow(`Room / Cabin Charges (${booking.numNights} Night${booking.numNights > 1 ? "s" : ""})`, booking.totalPrice || 0, { bold: true });

      // Food orders
      if (booking.orders && booking.orders.length > 0) {
        y += 2;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...C.gold);
        doc.text("FOOD & BEVERAGE", leftM + 4, y);
        y += 6;

        booking.orders.forEach((order) => {
          order.order_items?.forEach((item) => {
            addRow(
              `${item.menu_items?.name || "Item"}  x${item.quantity}`,
              item.unitPrice * item.quantity,
              { indent: 4, color: C.sub, size: 8 }
            );
          });
        });

        addRow("Food & Beverage Subtotal", ordersTotal, { bold: true, color: C.navy });
      }

      // ── Grand Total Box ──
      y += 8;
      if (y > 255) { doc.addPage(); y = 20; }

      doc.setFillColor(...C.bg);
      doc.roundedRect(leftM, y, rightM - leftM, 18, 2, 2, "F");
      doc.setDrawColor(...C.gold);
      doc.setLineWidth(0.6);
      doc.roundedRect(leftM, y, rightM - leftM, 18, 2, 2, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...C.sub);
      doc.text("GRAND TOTAL", leftM + 6, y + 11);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(...C.gold);
      doc.text(pdfCurrency(grandTotal), rightM - 6, y + 12, { align: "right" });

      // ── Footer ──
      const fy = 278;
      doc.setDrawColor(...C.line);
      doc.setLineWidth(0.3);
      doc.line(leftM, fy - 5, rightM, fy - 5);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...C.navy);
      doc.text("Thank you for choosing The Retreat Cottage", pw / 2, fy, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      doc.setTextColor(...C.sub);
      doc.text("This is a computer-generated receipt and does not require a signature.", pw / 2, fy + 4, { align: "center" });

      doc.save(`Receipt_TRC_${booking.id}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const getAccommodationNames = (booking) => {
    const cabinNames =
      booking.booking_cabins?.map((bc) => bc.cabins?.name).filter(Boolean) ||
      [];
    const roomNames =
      booking.booking_rooms?.map((br) => br.rooms?.name).filter(Boolean) || String(booking.id);
    return cabinNames.length || roomNames.length ? [...cabinNames, ...roomNames] : ["Boutique Stay"];
  };

  const getOrdersTotal = (orders) =>
    orders?.reduce((sum, o) => sum + (o.totalPrice || 0), 0) || 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="bg-primary-900/60 backdrop-blur-sm border border-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="inline-flex items-center gap-2 text-accent-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <Receipt className="h-3 w-3" />
          <span>Billing</span>
        </div>
        <h2 className="font-black text-2xl sm:text-3xl text-white mb-2 tracking-tight">
          Your Receipts
        </h2>
        <p className="text-primary-300 text-sm max-w-xl leading-relaxed">
          Download detailed receipts for your past stays including room charges
          and food orders.
        </p>
      </div>

      {/* Receipt Cards */}
      {bookings.length === 0 ? (
        <div className="bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
          <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No receipts yet</h3>
          <p className="text-primary-400 text-sm">
            Receipts will appear here after you check out from a stay.
          </p>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
          {bookings.map((booking, i) => {
            const isExpanded = expandedId === booking.id;
            const accomNames = getAccommodationNames(booking);
            const ordersTotal = getOrdersTotal(booking.orders);
            const grandTotal = (booking.totalPrice || 0) + ordersTotal;

            return (
              <div
                key={booking.id}
                className="bg-primary-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-accent-500/20 transition-all duration-500"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Card Header */}
                <button
                  onClick={() => toggle(booking.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent-500/10 flex items-center justify-center border border-accent-500/20 shrink-0">
                      <Home className="w-5 h-5 text-accent-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base group-hover:text-accent-300 transition-colors">
                        {accomNames.length > 0 ? accomNames.join(", ") : "Stay"}
                      </h3>
                      <p className="text-primary-400 text-xs mt-0.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(booking.startDate)} —{" "}
                        {formatDate(booking.endDate)} · {booking.numNights}{" "}
                        nights
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-accent-400 font-black text-lg hidden sm:block">
                      {formatCurrency(grandTotal)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-primary-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/5 pt-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    {/* Stay Summary */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                        Stay Summary
                      </h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-300">
                          Room/Cabin Charges ({booking.numNights} nights)
                        </span>
                        <span className="text-white font-semibold">
                          {formatCurrency(booking.totalPrice || 0)}
                        </span>
                      </div>
                    </div>

                    {/* Orders Summary */}
                    {booking.orders && booking.orders.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                          Food Orders
                        </h4>
                        {booking.orders.map((order) => (
                          <div key={order.id} className="space-y-1">
                            {order.order_items?.map((oi, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-primary-300">
                                  {oi.menu_items?.name || "Item"} ×{" "}
                                  {oi.quantity}
                                </span>
                                <span className="text-white font-semibold">
                                  {formatCurrency(oi.unitPrice * oi.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ))}
                        <div className="flex justify-between text-sm border-t border-white/5 pt-2">
                          <span className="text-primary-300">
                            Orders Subtotal
                          </span>
                          <span className="text-white font-semibold">
                            {formatCurrency(ordersTotal)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Grand Total */}
                    <div className="flex justify-between items-center border-t border-accent-500/20 pt-3">
                      <span className="text-white font-bold">Grand Total</span>
                      <span className="text-accent-400 font-black text-xl">
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(booking)}
                      disabled={downloadingId === booking.id}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent-500/10 hover:bg-accent-500/25 text-accent-400 border border-accent-500/20 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingId === booking.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-accent-400 border-t-transparent rounded-full animate-spin" />
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Receipt
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ReceiptsClient;
