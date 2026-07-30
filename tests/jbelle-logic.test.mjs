import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const sandbox = {
  window: {},
  document: { addEventListener() {} },
  sessionStorage: {
    getItem() { return null; },
    setItem() {},
    removeItem() {}
  },
  URL,
  console
};

vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("assets/js/config.js", "utf8"), sandbox);
vm.runInContext(fs.readFileSync("assets/js/app.js", "utf8"), sandbox);

test("recomienda Natural con respuestas naturales y de uso diario", () => {
  assert.equal(sandbox.window.calculateRecommendation([0, 0, 0]), "natural");
});

test("recomienda Intermedio con respuestas elegantes y versátiles", () => {
  assert.equal(sandbox.window.calculateRecommendation([1, 3, 1]), "intermedio");
});

test("recomienda Volumen con impacto, eventos y pestañas abundantes", () => {
  assert.equal(sandbox.window.calculateRecommendation([2, 2, 2]), "volumen");
});

test("crea un mensaje de WhatsApp con todos los datos del pedido", () => {
  const message = sandbox.window.buildWhatsAppMessage({
    name: "María Prueba",
    city: "Tegucigalpa",
    style: "volumen",
    payment: "Pago al recibir en efectivo",
    help: true
  });

  assert.match(message, /María Prueba/);
  assert.match(message, /Volumen 14 mm/);
  assert.match(message, /Tegucigalpa/);
  assert.match(message, /Pago al recibir en efectivo/);
  assert.match(message, /Precio del kit: L 790/);
  assert.match(message, /ayuden a confirmar/);

  const url = `https://wa.me/${sandbox.window.JBELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  assert.ok(url.startsWith("https://wa.me/50495248254?text="));
  assert.ok(url.includes("Mar%C3%ADa%20Prueba"));
});
