const WA_NUMBER = "6282362129646";
const PRODUCT_NAME = "Crabprek Sambel Geprek";
const UNIT_PRICE = 18000;

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const preloader = document.getElementById("preloader");
  const hideLoader = () => setTimeout(() => preloader?.classList.add("hide"), 450);
  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader, { once: true });
  setTimeout(hideLoader, 2500);

  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  const closeMenu = () => {
    links?.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) toggle.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  };
  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });
  links?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("click", e => {
    if (links && toggle && !links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const qty = document.getElementById("quantity");
  const total = document.getElementById("total-price");
  const rupiah = n => new Intl.NumberFormat("id-ID", {style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
  const count = () => Math.min(99, Math.max(1, Number.parseInt(qty?.value || "1", 10) || 1));
  const update = () => { if (!qty || !total) return; qty.value = count(); total.textContent = rupiah(count() * UNIT_PRICE); };
  qty?.addEventListener("input", update);
  document.getElementById("minus")?.addEventListener("click", () => { qty.value = Math.max(1, count()-1); update(); });
  document.getElementById("plus")?.addEventListener("click", () => { qty.value = Math.min(99, count()+1); update(); });
  update();

  document.getElementById("order-form")?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("customer-name").value.trim();
    if (!name) return;
    const quantity = count();
    const note = document.getElementById("note").value.trim();
    const message = [
      "Halo Admin CRABPREK! Saya ingin memesan:",
      "",
      `Nama: ${name}`,
      `Pesanan: ${PRODUCT_NAME}`,
      `Jumlah: ${quantity} porsi`,
      `Harga satuan: ${rupiah(UNIT_PRICE)}`,
      `Estimasi total: ${rupiah(quantity * UNIT_PRICE)}`,
      note ? `Catatan: ${note}` : "",
      "",
      "Mohon konfirmasi ketersediaan dan detail pesanan. Terima kasih!"
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
});
