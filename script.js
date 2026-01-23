(() => {
  'use strict';

  const form = document.getElementById('calcForm');
  const resultDiv = document.getElementById('result');
  const decimalInput = document.getElementById('decimalInput');
  const fractionInput = document.getElementById('fractionInput');

  // ラジオボタン切り替え
  form.probType.forEach(radio => {
    radio.addEventListener('change', () => {
      decimalInput.classList.toggle('hidden', radio.value !== 'decimal' || !radio.checked);
      fractionInput.classList.toggle('hidden', radio.value !== 'fraction' || !radio.checked);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    resultDiv.textContent = '';

    try {
      const prob = getProbability();
      const trials = parsePositiveInteger(document.getElementById('trials').value);

      if (prob <= 0 || prob >= 1) {
        throw new Error('確率は 0 より大きく 1 未満である必要があります。');
      }

      const noneOccurs = Math.pow(1 - prob, trials);
      const occursAtLeastOnce = 1 - noneOccurs;

      resultDiv.textContent =
        `少なくとも1回発生する確率： ${occursAtLeastOnce.toFixed(6)}`;

    } catch (err) {
      resultDiv.textContent = `エラー： ${err.message}`;
    }
  });

  function getProbability() {
    const type = form.probType.value;

    if (type === 'decimal') {
      const value = document.getElementById('decimalValue').value;
      if (!/^\d+$/.test(value)) {
        throw new Error('小数部分は数字のみ入力してください。');
      }
      return Number(`0.${value}`);
    }

    const num = parsePositiveInteger(document.getElementById('numerator').value);
    const den = parsePositiveInteger(document.getElementById('denominator').value);

    if (num >= den) {
      throw new Error('分子は分母より小さくしてください。');
    }

    return num / den;
  }

  function parsePositiveInteger(value) {
    if (!/^\d+$/.test(value)) {
      throw new Error('正の整数を入力してください。');
    }
    const num = Number(value);
    if (num <= 0) {
      throw new Error('0より大きい値を入力してください。');
    }
    return num;
  }
})();

