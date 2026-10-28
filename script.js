document.addEventListener('DOMContentLoaded', () => {

  // 1. Atualiza ano no rodapé automaticamente
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Efeito de Scroll no Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Menu Mobile Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });

  // 4. FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');

      // Fecha outros itens abertos
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      // Alterna o item atual
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  // 5. SIMULADOR INTERATIVO DE ORÇAMENTO
  const radioTiles = document.querySelectorAll('.tile');
  const featureChecks = document.querySelectorAll('.feature-check');
  const totalPriceDisplay = document.getElementById('total-price');
  const sendWhatsappBtn = document.getElementById('send-whatsapp-btn');

  // Seleção visual dos Radio Buttons (Tiles)
  radioTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      radioTiles.forEach(t => t.classList.remove('active'));
      tile.classList.add('active');
      const radio = tile.querySelector('input[type="radio"]');
      radio.checked = true;
      calculateTotal();
    });
  });

  // Escuta alteração nos checkboxes
  featureChecks.forEach(check => {
    check.addEventListener('change', calculateTotal);
  });

  function calculateTotal() {
    let total = 0;

    // Pega o valor do tipo de site selecionado
    const selectedSite = document.querySelector('input[name="site_type"]:checked');
    if (selectedSite) {
      total += parseInt(selectedSite.getAttribute('data-price'));
    }

    // Soma com os recursos adicionais selecionados
    featureChecks.forEach(check => {
      if (check.checked) {
        total += parseInt(check.getAttribute('data-price'));
      }
    });

    // Atualiza a tela
    if (totalPriceDisplay) {
      totalPriceDisplay.textContent = total;
    }
  }

  // Enviar Briefing direto para o WhatsApp do Eugênio (62 993669106)
  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener('click', () => {
      const selectedSite = document.querySelector('input[name="site_type"]:checked');
      const siteTypeName = selectedSite ? selectedSite.value : 'Página de Vendas';

      let selectedFeatures = [];
      featureChecks.forEach(check => {
        if (check.checked) {
          selectedFeatures.push(check.value);
        }
      });

      const totalValue = totalPriceDisplay ? totalPriceDisplay.textContent : '0';

      // Monta a mensagem personalizada para o WhatsApp
      let message = `Olá Eugênio! Montei uma simulação do meu projeto no seu site:\n\n`;
      message += `📌 *Tipo de Projeto:* ${siteTypeName}\n`;
      
      if (selectedFeatures.length > 0) {
        message += `⚡ *Recursos Desejados:*\n - ${selectedFeatures.join('\n - ')}\n`;
      }
      
      message += `\n💰 *Estimativa:* R$ ${totalValue}\n\n`;
      message += `Podemos conversar para alinhar os detalhes e dar início?`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/5562993669106?text=${encodedMessage}`;

      // Abre o WhatsApp em nova aba
      window.open(whatsappURL, '_blank');
    });
  }

  // Executa o cálculo inicial ao carregar a página
  calculateTotal();
});