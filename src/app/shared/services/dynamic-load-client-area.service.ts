import { Injectable } from '@angular/core';


interface Scripts {
  name: string;
  src: string;
}


export const ScriptStore: Scripts[] = [
  { name: 'appjs', src: 'assets/admin/js/app.js' },
  { name: '_data-wishlist', src: 'assets/admin/js/_data-wishlist.js' },
  { name: '_data-addresses', src: 'assets/admin/js/_data-addresses.js' },
  { name: 'data-orders', src: 'assets/admin/js/_data-orders.js' },
  { name: 'functions', src: 'assets/admin/js/functions.js' },
  { name: 'authentication', src: 'assets/admin/js/authentication.js' },
  { name: 'cart', src: 'assets/admin/js/cart.js' },
  { name: 'account', src: 'assets/admin/js/account.js' },
  { name: 'wishlist', src: 'assets/admin/js/wishlist.js' },
  { name: 'product', src: 'assets/admin/js/product.js' },
  { name: 'orders', src: 'assets/admin/js/orders.js' },
  { name: 'order', src: 'assets/admin/js/order.js' },
  { name: 'checkout', src: 'assets/admin/js/checkout.js' },
  { name: 'search', src: 'assets/admin/js/search.js' },
  { name: 'nephos', src: 'assets/admin/js/nephos.js' }

];

declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadClientAreaService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }
    // load(scripts: string[]) {
  public load() {
    const promises: any[] = [];
    ScriptStore.forEach((script) => promises.push(this.loadScript(script.name)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }


}
