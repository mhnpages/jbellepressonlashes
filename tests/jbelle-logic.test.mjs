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

test("crea un mensaje directo de WhatsApp con el estilo elegido", () => {
  const message = sandbox.window.buildWhatsAppMessage("volumen");

  assert.match(message, /quiero hacer un pedido/);
  assert.match(message, /Volumen 14 mm/);
  assert.match(message, /formas de pago/);
  assert.match(message, /opciones de entrega/);

  const url = `https://wa.me/${sandbox.window.JBELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  assert.ok(url.startsWith("https://wa.me/50495248254?text="));
  assert.ok(url.includes("Volumen%2014%20mm"));
});

test("solicita estilos cuando aún no se ha elegido uno", () => {
  const message = sandbox.window.buildWhatsAppMessage();
  assert.match(message, /estilos disponibles/);
  assert.match(message, /formas de pago/);
});
