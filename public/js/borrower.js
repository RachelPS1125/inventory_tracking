(function(app) {
    app.borrower={};
    getBorrower();
    $('.js-borrower-form').submit(newBorrowerHandler);

    app.borrower.onDelete = function(element) {
        var container = element.closest('.dna-clone');
        var clone = dna.getClone(container);
        var model = dna.getModel(clone);
        $.ajax({
            url: '/api/borrowers/' + model.idNumber,
            method: 'DELETE'
        }).done(function() {
            dna.destroy(clone, {
                fade: true
            });
        });
    };

    app.borrower.onUpdate = function(element) {
        var container = element.closest('.dna-clone');
        var clone = dna.getClone(container);
        var model = dna.getModel(clone);
        $('.js-id-number').val(model.idNumber);        
        $('.js-borrower-form').off('submit', newBorrowerHandler);
        $('.js-first-name').val(model.firstName);
        $('.js-last-name').val(model.lastName);
        $('.js-class-year').val(model.classYear);
        $('.js-email').val(model.email);
        $('.js-cell-number').val(model.cellNumber);
        $('.js-borrower-form').off('submit', newBorrowerHandler);
        $('.js-borrower-form').submit(updateHandler);
    };

    function updateHandler(event) {
        event.preventDefault();
        var form = this;
        var idNumber = $('.js-id-number').val();
        var firstName = $('.js-first-name').val();
        var lastName = $('.js-last-name').val();
        var classYear = $('.js-class-year').val();
        var email = $('.js-email').val();
        var cellNumber = $('.js-cell-number').val();
        var payload = {
            idNumber:idNumber,
            firstName: firstName,
            lastName: lastName,
            classYear: classYear,
            email: email,
            cellNumber: cellNumber
        };
        $.ajax({
            url: '/api/borrowers/' + idNumber,
            method: 'PUT',
            data: JSON.stringify(payload),
            contentType: 'application/json'
        }).done(function(res) {
            var borrower = $('.js-borrower[data-borrower-id="' + res.idNumber + '"]')
            var template = dna.clone('js-borrower', res);
            borrower.replaceWith(template);
            form.reset();
            $(form).off('submit', updateHandler);
            $(form).submit(newBorrowerHandler);
        });
    }

    function newBorrowerHandler(event) {
        event.preventDefault();
        var form = this;
        var idNumber = $('.js-id-number').val();
        var firstName = $('.js-first-name').val();
        var lastName = $('.js-last-name').val();
        var classYear = $('.js-class-year').val();
        var email = $('.js-email').val();
        var cellNumber = $('.js-cell-number').val();
        var payload = {
            idNumber:idNumber,
            firstName: firstName,
            lastName: lastName,
            classYear: classYear,
            email: email,
            cellNumber: cellNumber
        };
        $.ajax({
            url: '/api/borrowers',
            method: 'POST',
            data: JSON.stringify(payload),
            contentType: 'application/json'
        }).done(function(res) {
            var template = dna.clone('js-borrower', res);
            template.attr('data-borrower-id', res.idNumber);
            form.reset();
        });
    }

    function getBorrower() {
        $.ajax({
            url: '/api/borrowers',
            method: 'GET'
        }).done(function(borrowers) {
            borrowers.forEach(function(borrower) {
                var template = dna.clone('js-borrower', borrower);
                template.attr('data-borrower-id', borrower.idNumber);
            });
        });
    }
})(window.usdanInventory);