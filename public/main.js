class CheckoutReceipt extends HTMLElement {
    constructor() {
        super();

        // Data
        // Could be added with UI
        this.basket = [
            { id: 1 },
            { id: 1 },
            { id: 1 },
            { id: 1 },
            { id: 1 },
            { id: 2 },
            { id: 2 },
            { id: 2 },
            { id: 2 },
            { id: 3, weight: 0.2 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 }
        ]

        this.item_data = [
            { id: 1, title: 'Beans', price: 0.50 },
            { id: 2, title: 'Cola', price: 0.70 },
            { id: 3, title: 'Onions', price: 1.99 },
            { id: 4, title: 'Ale - Butty Bach', price: 2.49 },
            { id: 5, title: 'Ale - Landlord', price: 2.29 },
            { id: 6, title: 'Ale - Doombar', price: 2.39 },
            { id: 7, title: 'Ale - Guiness', price: 2.19 }
        ]


        // Update basket with item_data
        this.basket.forEach(item => {
            let item_data = this.item_data.find(data => data.id == item.id)

            item.title = item_data.title
            item.price = parseFloat((item.weight ? (item_data.price * item.weight) : item_data.price).toFixed(2))
            item.price_per_kg = item_data.price
        })

        this.discount_bxgxf = [
            { title: 'Beans 3 for 2', trigger_products: [1], trigger_quantity: 3, charge_quantity: 2 }
        ]

        this.discount_set_quantity_set_price = [
            { title: 'Cola 2 for £1', trigger_products: [2], trigger_quantity: 2, charge_amount: 1 },
            { title: 'Ales 3 for £6', trigger_products: [4, 5, 6, 7], trigger_quantity: 3, charge_amount: 6 }
        ]

        // Elements
        this.el_item_list = this.querySelector('[data-receipt-items]')
        this.el_savings_list = this.querySelector('[data-receipt-savings]')
        this.el_subtotal = this.querySelector('[data-receipt-subtotal]')
        this.el_savings_total = this.querySelector('[data-receipt-savings-total]')
        this.el_receipt_total = this.querySelector('[data-receipt-total]')

        // Values 
        this.subtotal = 0
        this.savings_total = 0

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
            // Create markup and replace values
            let formatted_markup = this.item_markup
                .replace('{{ item_title }}', `${item.title} ${(item.weight ? ` <em>(${item.weight}kg @ £${item.price_per_kg}/kg)</em>` : '')}`)
                .replace('{{ item_value }}', `£${item.price.toFixed(2)}`)

            // Append item to list
            this.el_item_list.insertAdjacentHTML('beforeEnd', formatted_markup)

            // Update subtotal
            this.subtotal += parseFloat(item.price)
        })
    }

    addDiscountBxgxf() {
        this.discount_bxgxf.forEach(discount => {
            // Find each qualifiable item in the basket
            let qualifiable_items = this.basket.filter(item => discount.trigger_products.includes(item.id))

            // Order items (cheapest first)
            qualifiable_items.sort(function(a, b){return a.price - b.price});

            // Remove items that wont fit into discount
            let items_to_discount = qualifiable_items.slice(0, Math.floor(qualifiable_items.length / discount.trigger_quantity));

            // Calculate savings amount
            let savings_amount = parseFloat(items_to_discount.reduce((acc, item) => acc + parseFloat(item.price), 0))

            // Create markup and replace values
            let formatted_markup = this.item_markup
                .replace('{{ item_title }}', discount.title)
                .replace('{{ item_value }}', `£${savings_amount.toFixed(2)}`)

            // Append item to list
            this.el_savings_list.insertAdjacentHTML('beforeEnd', formatted_markup)

            // Update savings amount
            this.savings_total += parseFloat(savings_amount)
        })
    }

    addDiscountSetQuantityPrice() {
        this.discount_set_quantity_set_price.forEach(discount => {
            let discount_savings = 0;

            // Find each qualifiable item in the basket
            let qualifiable_items = this.basket.filter(item => discount.trigger_products.includes(item.id))
         
            // Order items (cheapest first)
            qualifiable_items.sort((a, b) => a.price - b.price);

            // Remove items that wont fit into discount
            let items_to_discount = qualifiable_items.slice(0, (qualifiable_items.length - (qualifiable_items.length % discount.trigger_quantity)));

            // Put products into groups based on trigger quantities
            let groups = items_to_discount.map((item, index) => {
                return index % discount.trigger_quantity === 0 ? items_to_discount.slice(index, index + discount.trigger_quantity) : null
            }).filter(item => item)

            groups.forEach(group => {
                // Calculate group cost
                let group_cost = parseFloat(group.reduce((acc, item) => acc + parseFloat(item.price), 0))
                
                // Calculate group savings
                let group_savings = group_cost - discount.charge_amount
                
                discount_savings += parseFloat(group_savings)
            })

            // Create markup and replace values
            let formatted_markup = this.item_markup
                .replace('{{ item_title }}', discount.title)
                .replace('{{ item_value }}', `£${discount_savings.toFixed(2)}`)

            // Append item to list
            this.el_savings_list.insertAdjacentHTML('beforeEnd', formatted_markup)

            // Update savings amount
            this.savings_total += parseFloat(discount_savings)
        })
    }
    
    init() {
        this.addItems()
        this.addDiscountBxgxf()
        this.addDiscountSetQuantityPrice()
        
        // Update subtotal markup
        this.el_subtotal.innerHTML = `£${this.subtotal.toFixed(2)}`

        // Update total savings markup
        this.el_savings_total.innerHTML = `£${this.savings_total.toFixed(2)}`

        // Update total markup
        this.el_receipt_total.innerHTML = `£${(this.subtotal - this.savings_total).toFixed(2)}`
    }
}
  
customElements.define('checkout-receipt', CheckoutReceipt);