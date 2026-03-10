import * as readline from "readline";

// CLIENTE 
class Cliente {
    constructor(
        public nombre: string,
        public dui: string,
        public telefono: string,
        public correo: string,
        public fechaCompra: string,
    ) {

    }
}

// PRODUCTO 
class Producto {
    constructor(
        public nombre: string,
        public precio: number,
        public categoria: string,
    ) {

    }

    obtenerDescuento(): number {
        if (this.categoria.toLowerCase() === "tecnologia") return 0.10;
        if (this.categoria.toLowerCase() === "ropa") return 0.15;
        if (this.categoria.toLowerCase() === "calzado") return 0.20;
        return 0;
    }
}

// COMPRA 
class Compra {
    productos: Producto[] = [];

    agregarProducto(producto: Producto) {
        this.productos.push(producto);
    }

    calcularSubtotal(): number {
        return this.productos.reduce((acc, p) => acc + p.precio, 0);
    }

    calcularDescuento(): number {
        return this.productos.reduce(
            (acc, p) => acc + (p.precio * p.obtenerDescuento()),
            0
        );
    }

    calcularIVA(total: number): number {
        return total * 0.13;
    }
}

// ENTRADA DE DATOS

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function preguntar(pregunta: string): Promise<string> {
    return new Promise(resolve => rl.question(pregunta, resolve));
}

// PROGRAMA PRINCIPAL 

async function main() {

    const nombre = await preguntar("Cliente: ");
    const dui = await preguntar("DUI: ");
    const telefono = await preguntar("Telefono: ");
    const correo = await preguntar("Correo: ");
    const fecha = await preguntar("Fecha de compra: ");

    const cliente = new Cliente(nombre, dui, telefono, correo, fecha);

    const compra = new Compra();

    const producto = await preguntar("Producto: ");
    const precio = parseFloat(await preguntar("Precio: "));
    const categoria = await preguntar("Categoria (Tecnologia/Ropa/Calzado): ");

    compra.agregarProducto(new Producto(producto, precio, categoria));

    const subtotal = compra.calcularSubtotal();
    const descuento = compra.calcularDescuento();
    const totalConDescuento = subtotal - descuento;
    const iva = compra.calcularIVA(totalConDescuento);
    const totalPagar = totalConDescuento + iva;

    console.log("\n********* CODE 0001 *********");
    console.log("Cliente:", cliente.nombre);
    console.log("DUI:", cliente.dui);
    console.log("Telefono:", cliente.telefono);
    console.log("Fecha:", cliente.fechaCompra);
    console.log("------------------------------");

    console.log("Cant  Producto   Total");
    console.log(`1     ${producto}     $${precio}`);

    console.log("\nDescuento:", descuento.toFixed(2));
    console.log("IVA:", iva.toFixed(2));
    console.log("\nTOTAL A PAGAR: $", totalPagar.toFixed(2));

    rl.close();
}

main();
