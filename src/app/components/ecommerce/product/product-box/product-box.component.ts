import { ChangeDetectorRef, Component, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ProductService } from 'src/app/shared/services/ecommerce/product.service';
import { Products } from 'src/app/shared/model/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductBoxFilterService } from 'src/app/shared/services/ecommerce/product-box-filter.service';
import { DrProduct } from 'src/app/shared/model/dr-product.model';
import { DrServiceService } from 'src/app/shared/services/cart/dr-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {
  @Output() productDetail: any;
  dirBase = 'assets/images/products';
  imagenes = [
    'Airpods.png',
    'Altavoces.png',
    'aspiradora_robot.png',
    'Beats.png',
    'cable_vga.png',
    'combo_teclado_mouse.png',
    'combo_teclado_raton.png',
    'gamecube.png',
    'headset.png',
    'ipad_mini.png',
    'laptop_acer.png',
    'laptop_msi.png',
    'mac.png',
    'Macbook_pro.png',
    'Memoria_USB.png',
    'micro_sd.png',
    'Paralante_JBL_Colors.png',
    'parlante.png',
    'Parlante_JBL.png',
    'pc_all_in_one.png',
    'pc_gamer.png',
    'ps2.png',
    'ps4.png',
    'PSU_750w.png',
    'router.png',
    'silla.png'
  ];
  descripcionesVentas = [
    "¡Libertad auditiva con los Airpods inalámbricos de Apple!",
    "¡Disfruta de un sonido potente en cualquier lugar con nuestros altavoces!",
    "¡Mantén tu hogar impecable con la eficiencia de nuestra aspiradora robot!",
    "¡Sumérgete en tu música favorita con los auriculares Beats!",
    "¡Conexión estable y clara con nuestro cable VGA de alta calidad!",
    "¡Maximiza tu productividad con nuestro combo de teclado y ratón!",
    "¡Experimenta comodidad y eficacia con nuestro conjunto de teclado y ratón!",
    "¡Horas de diversión y entretenimiento con la consola de juegos Gamecube!",
    "¡Vive una experiencia de juego inmersiva con nuestro headset!",
    "¡Lleva tu mundo contigo con el iPad Mini portátil de Apple!",
    "¡Rendimiento confiable con la laptop Acer para todas tus necesidades!",
    "¡Potencia y rendimiento excepcionales con la laptop MSI!",
    "¡Productividad y elegancia con la computadora Mac de Apple!",
    "¡Alto rendimiento en un diseño portátil con el MacBook Pro de Apple!",
    "¡Almacenamiento móvil y transferencia rápida con nuestra memoria USB!",
    "¡Amplia capacidad de almacenamiento para tus dispositivos con la tarjeta micro SD!",
    "¡Sumérgete en un sonido excepcional con el altavoz JBL Colors!",
    "¡Disfruta de un sonido claro y nítido con nuestro parlante compacto!",
    "¡Calidad de sonido y diseño innovador con el altavoz JBL!",
    "¡Combina computadora y monitor en un diseño compacto con nuestra PC All-in-One!",
    "¡Experiencia de juego fluida y envolvente con nuestra PC gamer!",
    "¡Revive los clásicos con la consola PS2 para diversión sin fin!",
    "¡Disfruta de juegos de última generación con la consola PS4!",
    "¡Energía confiable y potente con nuestra PSU de 750W!",
    "¡Conexión inalámbrica y avanzada con nuestro router Wi-Fi!",
    "¡Comodidad óptima para largas horas de trabajo con nuestra silla ergonómica!"
  ];
  costosEstimados = [
    150,    // Airpods
    100,    // Altavoces
    250,    // Aspiradora robot
    200,    // Auriculares Beats
    15,     // Cable VGA
    30,     // Combo teclado y ratón
    35,     // Combo teclado y ratón
    50,     // Gamecube
    80,     // Headset
    350,    // iPad Mini
    600,    // Laptop Acer
    800,    // Laptop MSI
    1000,   // Mac
    1200,   // MacBook Pro
    20,     // Memoria USB
    10,     // Tarjeta micro SD
    80,     // Altavoz JBL Colors
    40,     // Parlante compacto
    70,     // Altavoz JBL
    500,    // PC All-in-One
    800,    // PC gamer
    50,     // PS2
    300,    // PS4
    100,    // PSU de 750W
    50,     // Router
    150     // Silla ergonómica
  ];


  product!: string;
  listData: DrProduct[] = [];
  cantidad = 1;
  sidebaron: boolean = false;
  show: boolean = false;
  open: boolean = false;
  cargando = true;
  public listView: boolean = false;
  public col_xl_12: boolean = false;
  public col_xl_2: boolean = false;

  public col_sm_3: boolean = false;
  public col_xl_3: boolean = true;
  public xl_4: boolean = true;
  public col_sm_4: boolean = false;
  public col_xl_4: boolean = false;
  public col_sm_6: boolean = true;
  public col_xl_6: boolean = false;
  public gridOptions: boolean = true;
  public active: boolean = false;

  private readonly ProductService = inject(ProductService);
  private readonly modalService = inject(NgbModal);
  private readonly toastrService = inject(ToastrService);

  constructor(
    private ProductBoxFilterService: ProductBoxFilterService,
    private cd: ChangeDetectorRef,
    private drCartService: DrServiceService
  ) {
  }

  openMediaFilter() {
    if (this.show == false && this.sidebaron == false && this.open == false) {
      this.show = true
      this.sidebaron = true
      this.open = true
    } else {
      this.show = false
      this.sidebaron = false
      this.open = false
    }
  }

  formattedName(name: string): string {
    return name.replace(/_/g, ' ');
  }

  openProductDetail(content: any, id: number) {
    this.modalService.open(content, { centered: true, size: 'lg' });
    this.ProductService.getProduct(id).subscribe((product: any) => {
      this.productDetail = product;
    });
  }

  ngOnInit() {
    this.simularDatos();
    // this.ProductService.drGetProducts().subscribe((data: DrProduct[]) => {
    //   console.log(data)
    //   this.listData = data;
    // });
    // this.cargaMasiva();
  }

  simularDatos(): void {
    this.obtenerProductos();
    this.obtenerProductosEstaticos();
  }

  obtenerProductos(): void {
    this.cantidad += 1;
    if (this.cantidad > 30) this.cantidad = 10;
    this.ProductService.drGetProductosPorCantidad(this.cantidad).subscribe((_: any) => {

    },
      (_) => {

      });
  }

  obtenerProductosEstaticos(): void {
    this.cargando = true;
    const numerosAleatorios: number[] = [];
    for (let i = 0; i < 4; i++) {
      let aleatorio = Math.floor(Math.random() * this.imagenes.length);
      if (i === 0) {
        numerosAleatorios.push(aleatorio);
      } else {
        while (numerosAleatorios.includes(aleatorio)) {
          aleatorio = Math.floor(Math.random() * this.imagenes.length);
        }
      }
      numerosAleatorios.push(aleatorio);
      const precio = this.aleatorio(10000);
      this.listData.push({
        idProductos: this.listData.length + 1,
        nombreProducto: this.imagenes[aleatorio].split('.')[0].replace(/_/g, ' ').toLocaleUpperCase(),
        descripcion: this.descripcionesVentas[aleatorio],
        imagen: `${this.dirBase}/${this.imagenes[aleatorio].split('.')[0]}.png`,
        marca: this.marca(this.aleatorio(8)),
        moneda: 'L. ',
        qty: 1,
        ranking: 5,
        precioDescuento: this.costosEstimados[aleatorio],
        precio: this.costosEstimados[aleatorio] * 0.9,
      });
    }

    setTimeout(() => {
      this.cargando = false;
    }, 1500);
  }

  loremIpsu(wordCount: number) {
    // Texto Lorem Ipsum original
    const loremIpsumText = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";

    const words = loremIpsumText.split(" ");

    let randomLoremIpsum = "";
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomLoremIpsum += words[randomIndex] + " ";
    }
    return randomLoremIpsum.trim();
  }

  marca(i: number): string {
    return ['Nike', 'Adidas', 'HP', 'Samsung', 'Pavilon', 'Polo', 'Joma', 'Huawei', 'Oracle'][i];
  }

  ngDoCheck() {
    this.col_xl_12 = this.ProductBoxFilterService.col_xl_12;
    this.col_xl_2 = this.ProductBoxFilterService.col_xl_2;
    this.col_sm_3 = this.ProductBoxFilterService.col_xl_12;
    this.col_xl_3 = this.ProductBoxFilterService.col_xl_3;
    this.xl_4 = this.ProductBoxFilterService.xl_4;
    this.col_sm_4 = this.ProductBoxFilterService.col_sm_4;
    this.col_xl_4 = this.ProductBoxFilterService.col_xl_4;
    this.col_sm_6 = this.ProductBoxFilterService.col_sm_6;
    this.col_xl_6 = this.ProductBoxFilterService.col_xl_6;
  }

  agregarAlCarrito(product: DrProduct): void {
    this.drCartService.agregar(product);
    this.toastrService.success('Producto agregado al carrito');
  }

  cargaMasiva(): void {
    this.ProductService.drMassiveGetProducts(100000).subscribe((_: any) => {
      console.log('completada', _)
    });
  }

  aleatorio(fin: number): number {
    return Math.floor(Math.random() * fin) + 1;
  }
}
