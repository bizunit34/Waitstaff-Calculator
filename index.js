
/* eslint-disable no-console */
'use strict';

/*eslint-env jquery*/

const STORE = {
  subtotalAmount: [],
  tipAmount: []
};

//This will reset the page with all of the currenct correct info
function renderWaitstaffCalc(subtotal, dollarTip, total) {
  if(STORE.subtotalAmount.length === 0) {
    $('.js-subtotal').text('Subtotal: $0.00');
    $('.js-tip-amount').text('Tip: $0.00');
    $('.js-meal-total').text('Total: $0.00');
  }
  else {
    $('.js-subtotal').text('Subtotal: $' + subtotal.toFixed(2));
    $('.js-tip-amount').text('Tip: $' + dollarTip.toFixed(2));
    $('.js-meal-total').text('Total: $' + total.toFixed(2));
  }

  
  if (STORE.tipAmount.length === 0) {
    $('.js-tip-total').text('Tip Total: $0.00');
    $('.js-meal-count').text('Meal count: 0');
    $('.js-avg-tip-per-meal').text('Average Tip Per Meal: $0.00');
  }
  else {
    let tipTotal = STORE.tipAmount.reduce((a,b) => a + b).toFixed(2);
    let mealCount = STORE.subtotalAmount.length;
    let avgMealTip = tipTotal / mealCount;
    $('.js-tip-total').text('Tip Total: $' + tipTotal);
    $('.js-meal-count').text('Meal count: ' + mealCount);
    $('.js-avg-tip-per-meal').html('Average Tip Per Meal: $' + avgMealTip.toFixed(2));
  }
}

/**
 * this calculates the subtotal
 * and displays it on the page
 */
function subtotalAmount(newMealPrice, newTaxRate){
  return parseFloat(newMealPrice) + parseFloat(newMealPrice) * newTaxRate / 100;
}

/**
 * This takes the tip% and displays it as $ amount
 * on the page 
 */
function tipCalc(newMealPrice, newTipRate) {
  return newMealPrice * newTipRate / 100;
}

/**
 * calculates the total amount of money spent
 * and pushes it to the page
 */
function totalCalc(subTotal, dollarTip) {
  return subTotal + dollarTip;
}

//Adding items to STORE
function addItemToList(subtotal, dollarTip) {
  console.log(`Adding a $${subtotal} meal with a $${dollarTip} tip to shopping list`);
  STORE.subtotalAmount.push(subtotal);
  STORE.tipAmount.push(dollarTip);
  console.log(STORE);
}
/**
 * The submit button will push meals into the STORE array for later counting.
 */
function handleNewMealSubmit() {
  $('#js-calculator-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewMealSubmit` ran');
    const newMealPrice = $('.js-meal-price').val();
    const newTaxRate = $('.js-tax-rate').val();
    const newTipRate = $('.js-tip-percentage').val();
    // $('.js-meal-price').val('');
    // $('.js-tax-rate').val('');
    // $('.js-tip-percentage').val('');
    const subtotal = subtotalAmount(newMealPrice, newTaxRate);
    const dollarTip = tipCalc(newMealPrice, newTipRate);
    const total = totalCalc(subtotal, dollarTip);
    addItemToList(subtotal, dollarTip);
    renderWaitstaffCalc(subtotal, dollarTip, total);
  });
}

function handleCancel() {
  $('#clear-meal-cost').on('click', () => {
    $('.js-meal-price').val('');
    $('.js-tax-rate').val('');
    $('.js-tip-percentage').val('');
    console.log('`handleCancel` ran');
  });
}

function handleReset() {
  $('#reset-everything').on('click', () => {
    $('.js-meal-price').val('');
    $('.js-tax-rate').val('');
    $('.js-tip-percentage').val('');
    STORE.subtotalAmount = [];
    STORE.tipAmount= [];
    console.log('`handleReset` ran');
    renderWaitstaffCalc(0, 0, 0);
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleWaitstaffCalculator() {
  renderWaitstaffCalc();
  handleNewMealSubmit();
  handleCancel();
  handleReset();
}
    
// when the page loads, call `handleWaitstaffCalculator`
$(handleWaitstaffCalculator);