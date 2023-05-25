class CheckoutReceipt extends HTMLElement {
    constructor() {
        super();

        // Data
        this.basket = [
            { id = '1' },
            { id = '1' },
            { id = '1' },
            { id = '1' },
            { id = '2' },
            { id = '2' },
            { id = '2' },
            { id = '3', weight = 0.2 }
            { id = '4' }
            { id = '5' }
            { id = '6' }
            { id = '7' }
        ]

        this.item_data = [
            { id = 1, title = 'Beans', price = 0.50 },
            { id = 2, title = 'Cola', price = 0.70 },
            { id = 3, title = 'Onion', price = 1.99 },
            { id = 4, title = 'Ale - Butty Bach', price = 1.99 },
            { id = 5, title = 'Ale - Landlord', price = 1.99 },
            { id = 6, title = 'Ale - Doombar', price = 1.99 },
            { id = 7, title = 'Ale - Guiness', price = 1.99 },
        ]

        // Elements
        this.item_list = this.querySelector('[data-receipt-items]')
        this.savings_list = this.querySelector('[data-receipt-savings]')

        // Markup used to generate receipt
        this.item_markup = `
            <div class="flex justify-between py-2 align-center">
                <span>{{ item_title }}</span>
                <span>{{ item_value }}</span>
            </div>
        `

        window.addEventListener('load', this.init.bind(this));
    }

    init() {
        // functions to fire

        addItems()
        // addSavings
        // addTotals
    }

}
  
customElements.define('checkout-receipt', CheckoutReceipt);