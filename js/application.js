$(document).ready(function () {

  function updateSubtotal(row) {
    const price = parseFloat(row.find('.price').text());
    const qty = parseInt(row.find('.quantity').val());
    const validPrice = isNaN(price) ? 0 : price;
    const validQty = isNaN(qty) ? 0 : qty;
    const subtotal = (validPrice * validQty).toFixed(2);
    row.find('.subtotal').text(subtotal);
  }

  function updateTotal() {
    let total = 0;
    $('#cart-table tbody tr').each(function () {
      total += parseFloat($(this).find('.subtotal').text());
    });
    $('#total').text(total.toFixed(2));
  }

  let debounceTimer;

  $('#cart-table').on('input', '.quantity', function () {
    const row = $(this).closest('tr');
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      updateSubtotal(row);
      updateTotal();
    }, 300);
  });

  $('#cart-table').on('click', '.delete', function () {
    $(this).closest('tr').remove();
    updateTotal();
  });

  function addItem() {
    const name = $('#new-item').val().trim();
     const price = parseFloat($('#new-price').val());
    const qty = parseInt($('#new-quantity').val());

    if (!name || isNaN(price) || isNaN(qty)) return;
    
    const subtotal = (price * qty).toFixed(2);
    const newRow = `
      <tr>
        <td>${name}</td>
        <td class="price">${price.toFixed(2)}</td>
        <td><input type="number" class="form-control quantity" value="${qty}" min="1"></td>
        <td class="subtotal">${subtotal}</td>
        <td><button class="btn btn-danger btn-sm delete">X</button></td>
      </tr>
    `;

    $('#cart-table tbody').append(newRow);
    $('#new-item').val('');
    $('#new-price').val('');
    $('#new-quantity').val('');

    updateTotal();

    // Move cursor back to Item field
    $('#new-item').focus()
  }
  $('#add-item').click(addItem);
  $('#new-quantity').on('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  });
    // Move cursor to Item field on page load
  $('#new-item').focus();

  updateTotal();
});
