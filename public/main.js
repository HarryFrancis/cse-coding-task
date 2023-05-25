class CheckoutReceipt extends HTMLElement {
    constructor() {
        super();

        // Data
        this.basket = [
            { id: '1' },
            { id: '1' },
            { id: '1' },
            { id: '1' },
            { id: '2' },
            { id: '2' },
            { id: '2' },
            { id: '3', weight: 0.2 },
            { id: '4' },
            { id: '5' },
            { id: '6' },
            { id: '7' }
        ]

        this.item_data = [
            { id: 1, title: 'Beans', price: 0.50 },
            { id: 2, title: 'Cola', price: 0.70 },
            { id: 3, title: 'Onions', price: 1.99 },
            { id: 4, title: 'Ale - Butty Bach', price: 2.49 },
            { id: 5, title: 'Ale - Landlord', price: 2.49 },
            { id: 6, title: 'Ale - Doombar', price: 2.49 },
            { id: 7, title: 'Ale - Guiness', price: 2.49 }
        ]

        // Elements
        this.el_item_list = this.querySelector('[data-receipt-items]')
        this.el_savings_list = this.querySelector('[data-receipt-savings]')
        this.el_subtotal = this.querySelector('[data-receipt-subtotal]')
        this.el_savings_total = this.querySelector('[data-receipt-savings-total]')
        this.el_receipt_total = this.querySelector('[data-receipt-total]')

        // Values 
        this.subtotal = 0

        // Markup
        this.item_markup = `
            <div class="flex justify-between align-center py-1">
                <span>{{ item_title }}</span>
                <span>{{ item_value }}</span>
            </div>
        `

        window.addEventListener('load', this.init.bind(this));
    }

    addItems() {
        // Foreach item in basket
        this.basket.forEach(item => {
            // Find associated item data
            let item_data = this.item_data.find(data => data.id == item.id)

            // Create markup with data
            if (item.weight) {
                // For items with weight, we use two lines
                let formatted_markup_1 = this.item_markup
                    .replace('{{ item_title }}', item_data.title)
                    .replace('{{ item_value }}', '')                

                let formatted_markup_2 = this.item_markup
                    .replace('{{ item_title }}', `${item.weight.toFixed(3)}kg @ £${item_data.price.toFixed(2)}`)
                    .replace('{{ item_value }}', `£${(item_data.price * item.weight).toFixed(2)}`)

                // Append item to list
                this.el_item_list.insertAdjacentHTML('beforeEnd', formatted_markup_1)
                this.el_item_list.insertAdjacentHTML('beforeEnd', formatted_markup_2)

                // Update subtotal
                this.subtotal += parseFloat((item_data.price * item.weight).toFixed(2))
            } else {
                let formatted_markup = this.item_markup
                    .replace('{{ item_title }}', item_data.title)
                    .replace('{{ item_value }}', `£${item_data.price.toFixed(2)}`)
                
                // Append item to list
                this.el_item_list.insertAdjacentHTML('beforeEnd', formatted_markup)

                this.subtotal += parseFloat(item_data.price.toFixed(2))
            }
        })

        // Update subtotal
        this.el_subtotal.innerHTML = `£${this.subtotal}`
    }

    init() {
        this.addItems()
        // addTotals
    }
}
  
customElements.define('checkout-receipt', CheckoutReceipt);