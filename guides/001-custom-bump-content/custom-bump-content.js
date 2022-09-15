// Define the element data-titles that we want to look for
let bump_element_data_title = 'bump-element';
let custom_bump_content_data_title = 'custom-bump-content';

document.addEventListener('DOMContentLoaded', function(el){
    // Select the bump element based on the data title we defined above
    let bump = document.querySelector('[data-title="' + bump_element_data_title + '"] .sectioncontent');  // Default Bump Element
    // Select the bump content that we want inserted into the bump box
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
});