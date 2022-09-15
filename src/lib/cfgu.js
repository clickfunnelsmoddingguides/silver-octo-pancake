/** ClickFunnels Modding Guide Utilities **/
const CfModGuideUtilities = {
    version: '1.0.0',
    library: '',
    /**
     * Custom Bump Element Content Replacement Function
     * Replaces content inside the bump box with fully custom defined content designed in the ClickFunnels Editor
     * @param bump_element_data_title - default bump data-title for which we want to replace content - default is `bump-element`
     * @param custom_bump_content_data_title - section data-title to use as the content reference for the bump custom content - default is `001-custom-bump-content`
     */
    replaceBumpBlockContent: function (bump_element_data_title = 'bump-element',
                                       custom_bump_content_data_title = 'custom-bump-content') {
        // Get the default Bump element
        let bump = document
            .querySelector('[data-title="' + bump_element_data_title + '"] .sectioncontent');  // Default Bump Element
        let bump_content = bump.getElementsByTagName('div')[1];  // Default Bump content container

        // Hide the existing bump content
        bump_content.style.display = 'none';

        // Move the Custom Bump Section into the Original Bump Container
        let custom_bump = document.querySelector('[data-title="' + custom_bump_content_data_title + '"]');
        bump.appendChild(custom_bump);

        // Clear padding data inside bump element
        bump.querySelector('.container').style.padding = '0';
        bump.querySelector('.containerInner').style.padding = '0';
        bump.querySelectorAll('.containerInner .innerContent').forEach(e => {
            e.style.padding = '0'
        });
    },
    /**
     * Create a Fully  Custom Bump Element
     * Supports multiple bumps simulatenously - requires setting the name to `custom-bump-<<product_id>>`
     * Requirements:
     * - Button to add bump to cart
     * - Button to remove bump from cart
     * - id of the product defined in container data-title
     * @param custom_bump_prefix
     * @param add_button_data_title
     * @param remove_button_data_title
     */
    customBumpBlock: function(custom_bump_prefix='custom-bump-', add_button_data_title='btn-custom-bump-add-', remove_button_data_title='btn-custom-bump-remove-') {
        // #cfAR - the ClickFunnels container element for all submitted data
        let cfar = document.querySelector('#cfAR');

        // Find all full-custom bump elements
        document.querySelectorAll('[data-title^="'+custom_bump_prefix+'"]').forEach( el => {
            let product_id= el.dataset.title.split('-').at(-1);

            // Add product enablement behavior to Add Button
            let add_btn = el.querySelector('[data-title^='+add_button_data_title+'] a');
            if (typeof add_btn !== 'undefined') {
                add_btn.addEventListener('click', e => {
                    let product_element = cfar.querySelector('input[type="checkbox"][name="purchase[product_ids][]"][value="' + product_id + '"]'); // Select #cfAR the product element
                    product_element.setAttribute('checked', 'checked'); // check the product
                    window.cfpeRebuildOrderSummary(); // ClickFunnels product summary update internal function
                });
            }

            // Add product disablement behavior to Remove Button
            let remove_btn = el.querySelector('[data-title^='+remove_button_data_title+'] a');
            if (typeof remove_btn !== 'undefined') {
                remove_btn.addEventListener('click', e => {
                    let product_element = cfar.querySelector('input[type="checkbox"][name="purchase[product_ids][]"][value="' + product_id + '"]'); // Select #cfAR the product element
                    product_element.removeAttribute('checked'); // uncheck the product
                    window.cfpeRebuildOrderSummary(); // ClickFunnels product summary update internal function
                });
            }
        });
    }
}

export default CfModGuideUtilities