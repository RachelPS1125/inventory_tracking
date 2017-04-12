(function(app) {
    app.inventory={};
    getInventory();
    $('.js-inventory-form').submit(newItemHandler);

    app.inventory.onDelete = function(element) {
        var container = element.closest('.dna-clone');
        var clone = dna.getClone(container);
        var model = dna.getModel(clone);
        $.ajax({
            url: '/api/inventories/' + model.id,
            method: 'DELETE'
        }).done(function() {
            dna.destroy(clone, {
                fade: true
            });
        });
    }

    app.inventory.onUpdate = function(element) {
        var container = element.closest('.dna-clone');
        var clone = dna.getClone(container);
        var model = dna.getModel(clone);
        $('.js-inventory-form').off('submit', newItemHandler);
        $('.js-name').val(model.name);
        $('.js-quantity').val(model.quantity);
        $('.js-id').val(model.id);
        $('.js-inventory-form').submit(updateHandler);
    }

    function updateHandler(event) {
        event.preventDefault();
        var form = this;
        var formData = new FormData();
        var name = $('.js-name').val();
        var quantity = $('.js-quantity').val();
        var id = $('.js-id').val();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('game_image', $('.js-image')[0].files[0]);
        $.ajax({
            url: '/api/inventories/' + id,
            method: 'PUT',
            data: formData,
            contentType: false,
            processData: false
        }).done(function(res) {
            var item = {
                id: res.id,
                name: res.name,
                quantity: res.quantity,
                imageLink: res.imageLink
            };
            var inventory = $('.js-inventory-item[data-inventory-id="' + id + '"]')
            var template = dna.clone('js-inventory-item', item);
            inventory.replaceWith(template);
            form.reset();
            $(form).off('submit', updateHandler);
            $(form).submit(newItemHandler);
        });
    }

    function newItemHandler(event) {
        event.preventDefault();
        var form = this;
        var formData = new FormData();
        var name = $('.js-name').val();
        var quantity = $('.js-quantity').val();
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('game_image', $('.js-image')[0].files[0]);
        $.ajax({
            url: '/api/inventories/',
            method: 'POST',
            data: formData,
            contentType: false,
            processData: false
        }).done(function(res) {
            var item = {
                id: res.id,
                name: res.name,
                quantity: res.quantity,
                imageLink: res.imageLink
            };
            var template = dna.clone('js-inventory-item', item);
            template.attr('data-inventory-id', item.id);
            form.reset();
            $(form).off('submit', newItemHandler);
        });
    }

    function getInventory() {
        $.ajax({
            url: '/api/inventories',
            method: 'GET'
        }).done(function(items) {
            items.forEach(function(item) {
                var template = dna.clone('js-inventory-item', item);
                template.attr('data-inventory-id', item.id);
            });
        });
    }
})(window.usdanInventory);
