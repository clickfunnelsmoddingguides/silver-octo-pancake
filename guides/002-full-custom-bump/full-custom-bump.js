// #cfAR - the ClickFunnels container element for
let cfar = document.querySelector('#cfAR');
let custom_bump_prefix = 'custom-bump-';
let add_button_data_title = 'btn-custom-bump-add-';
let remove_button_data_title = 'btn-custom-bump-remove-';

document.addEventListener('DOMContentLoaded', function(el) {
// Find all full-custom bump elements
    document.querySelectorAll('[data-title^="' + custom_bump_prefix + '"]').forEach(el => {
        let product_id = el.dataset.title.split('-').at(-1);

        // Add product enablement behavior to Add Button
        let add_btn = el.querySelector('[data-title^=' + add_button_data_title + '] a');
        if (typeof add_btn !== 'undefined') {
            add_btn.addEventListener('click', e => {
                let product_element = cfar.querySelector('input[type="checkbox"][name="purchase[product_ids][]"][value="' + product_id + '"]'); // Select #cfAR the product element
                product_element.setAttribute('checked', 'checked'); // check the product
                window.cfpeRebuildOrderSummary(); // ClickFunnels product summary update function
            });
        }

        // Add product disablement behavior to Remove Button
        let remove_btn = el.querySelector('[data-title^=' + remove_button_data_title + '] a');
        if (typeof remove_btn !== 'undefined') {
            remove_btn.addEventListener('click', e => {
                let product_element = cfar.querySelector('input[type="checkbox"][name="purchase[product_ids][]"][value="' + product_id + '"]'); // Select #cfAR the product element
                product_element.removeAttribute('checked'); // uncheck the product
                window.cfpeRebuildOrderSummary(); // ClickFunnels product summary update function
            });
        }
    });
});