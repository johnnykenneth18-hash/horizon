// ====================================
// Global Functions and Variables
// ====================================

// Enhanced Crypto Data
const enhancedCryptoData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 43215.67,
    change: 2.34,
    marketCap: 845.2,
    volume: 28.4,
    color: "#F7931A",
    chartData: [42000, 42500, 43000, 42800, 43200, 43215],
    isFavorite: false,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 2987.42,
    change: 1.56,
    marketCap: 358.7,
    volume: 12.8,
    color: "#627EEA",
    chartData: [2900, 2920, 2950, 2970, 2980, 2987],
    isFavorite: false,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change: -0.42,
    marketCap: 20.5,
    volume: 3.2,
    color: "#0033AD",
    chartData: [0.58, 0.57, 0.58, 0.585, 0.575, 0.58],
    isFavorite: false,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 102.34,
    change: 5.23,
    marketCap: 44.3,
    volume: 5.6,
    color: "#00FFA3",
    chartData: [95, 97, 100, 101, 102, 102.34],
    isFavorite: false,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 7.89,
    change: 0.89,
    marketCap: 10.2,
    volume: 1.8,
    color: "#E6007A",
    chartData: [7.8, 7.85, 7.82, 7.87, 7.88, 7.89],
    isFavorite: false,
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    price: 14.56,
    change: -1.23,
    marketCap: 8.1,
    volume: 2.1,
    color: "#2A5ADA",
    chartData: [14.8, 14.7, 14.6, 14.5, 14.55, 14.56],
    isFavorite: false,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: 312.45,
    change: 1.23,
    marketCap: 48.9,
    volume: 8.7,
    color: "#F0B90B",
    chartData: [305, 308, 310, 311, 312, 312.45],
    isFavorite: false,
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: 0.62,
    change: 0.65,
    marketCap: 33.7,
    volume: 4.5,
    color: "#23292F",
    chartData: [0.6, 0.61, 0.615, 0.62, 0.62, 0.62],
    isFavorite: false,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.085,
    change: 3.45,
    marketCap: 12.1,
    volume: 2.3,
    color: "#C2A633",
    chartData: [0.082, 0.083, 0.084, 0.0845, 0.085, 0.085],
    isFavorite: false,
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: 36.78,
    change: -0.56,
    marketCap: 13.2,
    volume: 1.9,
    color: "#E84142",
    chartData: [37, 36.8, 36.9, 36.7, 36.75, 36.78],
    isFavorite: false,
  },
];

// Global toast function
const showToast = (message) => {
  const toast = document.getElementById("successToast");
  const toastMessage = document.getElementById("toastMessage");

  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
};

// ====================================
// Mobile Menu Toggle
// ====================================
const initMobileMenu = () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
};

// ====================================
// Smooth Scrolling
// ====================================
const initSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
};

// ====================================
// Markets Section Functions
// ====================================

// Generate a simple SVG chart line
const generateChartSVG = (data, isPositive) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 80;
      const y = 30 - ((value - min) / range) * 25;
      return `${x},${y}`;
    })
    .join(" ");

  return `
        <svg class="chart-line ${isPositive > 0 ? "positive" : isPositive < 0 ? "negative" : "neutral"}" width="80" height="30" viewBox="0 0 80 30">
            <polyline points="${points}" fill="none" stroke-width="2" />
        </svg>
    `;
};

// Populate enhanced crypto table
const populateEnhancedCryptoTable = () => {
  const cryptoTableBody = document.getElementById("cryptoTableBody");
  if (!cryptoTableBody) return;

  cryptoTableBody.innerHTML = "";

  enhancedCryptoData.forEach((crypto) => {
    const row = document.createElement("div");
    row.classList.add("crypto-row");

    const changeClass =
      crypto.change > 0
        ? "positive"
        : crypto.change < 0
          ? "negative"
          : "neutral";
    const changeSign = crypto.change > 0 ? "+" : "";
    const favoriteClass = crypto.isFavorite ? "active" : "";
    const favoriteIcon = crypto.isFavorite ? "fas fa-star" : "far fa-star";

    row.innerHTML = `
            <div class="crypto-info">
                <div class="crypto-logo" style="background-color: ${crypto.color}">
                    ${crypto.symbol.charAt(0)}
                </div>
                <div class="crypto-name">
                    <strong>${crypto.name}</strong>
                    <span class="crypto-symbol">${crypto.symbol}</span>
                </div>
            </div>
            <div class="crypto-price">
                $${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div class="crypto-change">
                <span class="price-change ${changeClass}">
                    <i class="fas fa-${crypto.change > 0 ? "caret-up" : crypto.change < 0 ? "caret-down" : "minus"}"></i>
                    ${changeSign}${Math.abs(crypto.change).toFixed(2)}%
                </span>
            </div>
            <div class="crypto-marketcap">
                $${crypto.marketCap.toLocaleString()}B
            </div>
            <div class="crypto-volume">
                $${crypto.volume.toLocaleString()}B
            </div>
            <div class="crypto-chart">
                <div class="chart-container">
                    ${generateChartSVG(crypto.chartData, crypto.change)}
                </div>
            </div>
            <div class="crypto-actions">
                <button class="action-btn trade" onclick="window.location.href='login.html'">Trade</button>
                <button class="action-btn favorite ${favoriteClass}" onclick="toggleFavorite(this, '${crypto.symbol}')">
                    <i class="${favoriteIcon}"></i>
                </button>
            </div>
        `;

    cryptoTableBody.appendChild(row);
  });

  updateLastUpdateTime();
  updateMarketStats();
};

// Update last update time
const updateLastUpdateTime = () => {
  const lastUpdateTime = document.getElementById("lastUpdateTime");
  if (!lastUpdateTime) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  lastUpdateTime.textContent = timeString;
};

// Update market statistics
const updateMarketStats = () => {
  const totalMarketCap = enhancedCryptoData.reduce(
    (sum, crypto) => sum + crypto.marketCap,
    0,
  );
  const totalVolume = enhancedCryptoData.reduce(
    (sum, crypto) => sum + crypto.volume,
    0,
  );
  const btcDominance = (
    (enhancedCryptoData[0].marketCap / totalMarketCap) *
    100
  ).toFixed(1);

  const totalMarketCapElement = document.getElementById("totalMarketCap");
  const totalVolumeElement = document.getElementById("totalVolume");
  const btcDominanceElement = document.getElementById("btcDominance");

  if (totalMarketCapElement)
    totalMarketCapElement.textContent = `$${totalMarketCap.toFixed(1)}T`;
  if (totalVolumeElement)
    totalVolumeElement.textContent = `$${totalVolume.toFixed(1)}B`;
  if (btcDominanceElement) btcDominanceElement.textContent = `${btcDominance}%`;
};

// Toggle favorite status
const toggleFavorite = (button, symbol) => {
  const crypto = enhancedCryptoData.find((c) => c.symbol === symbol);
  if (crypto) {
    crypto.isFavorite = !crypto.isFavorite;
    button.classList.toggle("active");
    const icon = button.querySelector("i");
    if (crypto.isFavorite) {
      icon.classList.remove("far", "fa-star");
      icon.classList.add("fas", "fa-star");
      showToast(`${symbol} added to favorites`);
    } else {
      icon.classList.remove("fas", "fa-star");
      icon.classList.add("far", "fa-star");
      showToast(`${symbol} removed from favorites`);
    }
  }
};

// Refresh market data
const refreshMarketData = () => {
  const refreshBtn = document.getElementById("refreshMarketData");
  if (!refreshBtn) return;

  refreshBtn.classList.add("spinning");

  // Simulate API call delay
  setTimeout(() => {
    // Update prices with random changes
    enhancedCryptoData.forEach((crypto) => {
      const randomChange = (Math.random() - 0.5) * 4;
      crypto.price += crypto.price * (randomChange / 100);
      crypto.change += randomChange;

      // Update chart data with new value
      crypto.chartData.shift();
      crypto.chartData.push(crypto.price);

      // Update market cap and volume slightly
      crypto.marketCap += crypto.marketCap * (randomChange / 200);
      crypto.volume += crypto.volume * (randomChange / 100);
    });

    // Re-populate table
    populateEnhancedCryptoTable();

    refreshBtn.classList.remove("spinning");
    showToast("Market data refreshed successfully");
  }, 1000);
};

// Initialize market filters and search
const initMarketFeatures = () => {
  // Add event listeners for market filters
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-tab")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");
      const rows = document.querySelectorAll(".crypto-row");

      rows.forEach((row) => {
        const cryptoName = row.querySelector(".crypto-name strong").textContent;
        const cryptoSymbol = row.querySelector(".crypto-symbol").textContent;
        const priceChange = row.querySelector(".price-change");

        let shouldShow = true;

        switch (filter) {
          case "top":
            shouldShow = priceChange.classList.contains("positive");
            break;
          case "favorites":
            // In a real app, check favorite status
            shouldShow = Math.random() > 0.5; // Simulated
            break;
          case "trending":
            shouldShow = Math.random() > 0.3; // Simulated
            break;
        }

        row.style.display = shouldShow ? "grid" : "none";
      });

      showToast(`Showing ${filter} assets`);
    });
  });

  // Add search functionality
  const searchInput = document.getElementById("searchCrypto");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll(".crypto-row");

      rows.forEach((row) => {
        const cryptoName = row
          .querySelector(".crypto-name strong")
          .textContent.toLowerCase();
        const cryptoSymbol = row
          .querySelector(".crypto-symbol")
          .textContent.toLowerCase();

        if (
          cryptoName.includes(searchTerm) ||
          cryptoSymbol.includes(searchTerm)
        ) {
          row.style.display = "grid";
        } else {
          row.style.display = "none";
        }
      });
    });
  }

  // Add refresh button listener
  const refreshBtn = document.getElementById("refreshMarketData");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshMarketData);
  }
};

// ====================================
// Initialize Everything
// ====================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize common features
  initMobileMenu();
  initSmoothScrolling();

  // Initialize markets if on homepage
  if (document.getElementById("cryptoTableBody")) {
    populateEnhancedCryptoTable();
    initMarketFeatures();

    // Auto-refresh every 30 seconds
    setInterval(refreshMarketData, 30000);

    // Learn More button functionality
    const learnMoreBtn = document.getElementById("learnMoreBtn");
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", () => {
        window.location.href = 'aboutUs.html';
      });
    }
  }
 });
