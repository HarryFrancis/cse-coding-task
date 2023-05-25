class CheckoutReceipt extends HTMLElement {
    constructor() {
        super();

        // Markup used to generate receipt
        this.item_markup = `
            <div class="flex justify-between py-2 align-center">
                <span>{{ item_title }}</span>
                <span>{{ item_value }}</span>
            </div>
        `

        // Data
        

        window.addEventListener('load', this.init.bind(this));
    }

    init() {
        // functions to fire

        // addItems
        // addSavings
        // addTotals

        console.log(this.item_markup);
    }
}
  
customElements.define('checkout-receipt', CheckoutReceipt);