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

  const handleDownload = async (booking) => {
    setDownloadingId(booking.id);

    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = document.getElementById(`receipt-${booking.id}`);
      if (!el) return;

      // Temporarily make visible for screenshot
      el.style.position = "fixed";
      el.style.left = "-9999px";
      el.style.top = "0";
      el.style.display = "block";

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      el.style.display = "none";
      el.style.position = "";
      el.style.left = "";
      el.style.top = "";

      const imgData = canvas.toDataURL("image/jpeg", 0.85);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `TheRetreatCottage_Receipt_${formatDate(booking.startDate)}.pdf`,
      );
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
      booking.booking_rooms?.map((br) => br.rooms?.name).filter(Boolean) || [];
    return [...cabinNames, ...roomNames];
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

                {/* Hidden PDF Template */}
                <div
                  id={`receipt-${booking.id}`}
                  style={{ display: "none", width: "595px" }}
                >
                  <div
                    style={{
                      fontFamily: "'Segoe UI', Arial, sans-serif",
                      padding: "40px",
                      color: "#1a1a2e",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {/* PDF Header */}
                    <div
                      style={{
                        borderBottom: "3px solid #c69963",
                        paddingBottom: "20px",
                        marginBottom: "25px",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "24px",
                          fontWeight: "800",
                          color: "#1a1a2e",
                          margin: 0,
                        }}
                      >
                        🏡 The Retreat Cottage
                      </h1>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#666",
                          margin: "4px 0 0",
                        }}
                      >
                        Manali, Himachal Pradesh, India
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#666",
                          margin: "2px 0 0",
                        }}
                      >
                        Receipt #{booking.id}
                      </p>
                    </div>

                    {/* Stay Info */}
                    <div style={{ marginBottom: "20px" }}>
                      <h2
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#c69963",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "10px",
                        }}
                      >
                        Stay Summary
                      </h2>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontSize: "12px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                padding: "6px 0",
                                color: "#444",
                              }}
                            >
                              Accommodation
                            </td>
                            <td
                              style={{
                                padding: "6px 0",
                                textAlign: "right",
                                fontWeight: "600",
                              }}
                            >
                              {accomNames.join(", ") || "—"}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "6px 0",
                                color: "#444",
                              }}
                            >
                              Check-in
                            </td>
                            <td
                              style={{
                                padding: "6px 0",
                                textAlign: "right",
                                fontWeight: "600",
                              }}
                            >
                              {formatDate(booking.startDate)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "6px 0",
                                color: "#444",
                              }}
                            >
                              Check-out
                            </td>
                            <td
                              style={{
                                padding: "6px 0",
                                textAlign: "right",
                                fontWeight: "600",
                              }}
                            >
                              {formatDate(booking.endDate)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "6px 0",
                                color: "#444",
                              }}
                            >
                              Duration
                            </td>
                            <td
                              style={{
                                padding: "6px 0",
                                textAlign: "right",
                                fontWeight: "600",
                              }}
                            >
                              {booking.numNights} night
                              {booking.numNights > 1 ? "s" : ""}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                padding: "6px 0",
                                color: "#444",
                              }}
                            >
                              Guests
                            </td>
                            <td
                              style={{
                                padding: "6px 0",
                                textAlign: "right",
                                fontWeight: "600",
                              }}
                            >
                              {booking.numGuests}
                            </td>
                          </tr>
                          <tr
                            style={{
                              borderTop: "1px solid #eee",
                            }}
                          >
                            <td
                              style={{
                                padding: "8px 0",
                                fontWeight: "700",
                              }}
                            >
                              Stay Total
                            </td>
                            <td
                              style={{
                                padding: "8px 0",
                                textAlign: "right",
                                fontWeight: "700",
                                color: "#c69963",
                              }}
                            >
                              {formatCurrency(booking.totalPrice || 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Orders */}
                    {booking.orders && booking.orders.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <h2
                          style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#c69963",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            marginBottom: "10px",
                          }}
                        >
                          Food Orders
                        </h2>
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "12px",
                          }}
                        >
                          <thead>
                            <tr
                              style={{
                                borderBottom: "1px solid #ddd",
                              }}
                            >
                              <th
                                style={{
                                  textAlign: "left",
                                  padding: "6px 0",
                                  color: "#888",
                                  fontWeight: "600",
                                }}
                              >
                                Item
                              </th>
                              <th
                                style={{
                                  textAlign: "center",
                                  padding: "6px 0",
                                  color: "#888",
                                  fontWeight: "600",
                                }}
                              >
                                Qty
                              </th>
                              <th
                                style={{
                                  textAlign: "right",
                                  padding: "6px 0",
                                  color: "#888",
                                  fontWeight: "600",
                                }}
                              >
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {booking.orders.flatMap((order) =>
                              order.order_items?.map((oi, idx) => (
                                <tr
                                  key={`${order.id}-${idx}`}
                                  style={{
                                    borderBottom: "1px solid #f5f5f5",
                                  }}
                                >
                                  <td style={{ padding: "6px 0" }}>
                                    {oi.menu_items?.name || "Item"}
                                  </td>
                                  <td
                                    style={{
                                      padding: "6px 0",
                                      textAlign: "center",
                                    }}
                                  >
                                    {oi.quantity}
                                  </td>
                                  <td
                                    style={{
                                      padding: "6px 0",
                                      textAlign: "right",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {formatCurrency(oi.unitPrice * oi.quantity)}
                                  </td>
                                </tr>
                              )),
                            )}
                            <tr style={{ borderTop: "1px solid #eee" }}>
                              <td
                                colSpan={2}
                                style={{
                                  padding: "8px 0",
                                  fontWeight: "700",
                                }}
                              >
                                Orders Total
                              </td>
                              <td
                                style={{
                                  padding: "8px 0",
                                  textAlign: "right",
                                  fontWeight: "700",
                                  color: "#c69963",
                                }}
                              >
                                {formatCurrency(ordersTotal)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Grand Total */}
                    <div
                      style={{
                        borderTop: "3px solid #c69963",
                        paddingTop: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "800",
                        }}
                      >
                        Grand Total
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "800",
                          color: "#c69963",
                        }}
                      >
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>

                    {/* Footer */}
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#aaa",
                        textAlign: "center",
                        marginTop: "30px",
                      }}
                    >
                      Thank you for staying with us! We hope to see you again.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ReceiptsClient;
