export function _formatNumber(
  value: number | string | null | undefined,
  options: Intl.NumberFormatOptions = {}
): string {
  if (value == null) return "00.00";
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num) || !isFinite(num)) return "00.00";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
    ...options,
  }).format(num);
}
interface GetOnly { second?: boolean, getOnlyTime?: boolean, getOnlyDate?: boolean }
export function _getFormatTime(timeString: number, getOnly: GetOnly = { second: false, getOnlyTime: false, getOnlyDate: false }) {
  if (!timeString) return;
  const date = new Date(timeString) as Date | "Invalid Date";
  if (date === "Invalid Date") {
    return "";
  }
  let time = date.toLocaleTimeString('en-US', {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  });

  const dateStr = date.toLocaleDateString('en-GB');
  if (!getOnly) {
    return time + " " + dateStr;
  }
  if (getOnly.second) {
    time = date.toLocaleTimeString('en-US', {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
    });
  }
  if (getOnly.getOnlyTime) {
    return time;
  }
  if (getOnly.getOnlyDate) {
    return dateStr;
  }
  return time + " " + dateStr;
}

// format 1234000000000.234 => 1,234.23 B
export function _numberShortener(num: number | string | null, digits: number = 0, hidenSymbol: boolean = false) {
  if (!num) return "00.00"
  const numberMap = Number(num) || 0
  const lookup = [
    { value: 0, symbol: "" },
    { value: 1, symbol: "" },
    { value: 1e6, symbol: " M" },
    { value: 1e9, symbol: " B" }
  ] as { value: number, symbol: string }[];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function (item) {
    return Math.abs(numberMap) >= item.value;
  }) || null as { value: number, symbol: string } | null;
  if (!item) return "0"
  let soChia = 0
  if (!item.value) {
    soChia = Number((numberMap).toFixed(digits))
  } else {
    soChia = Number((numberMap / item.value).toFixed(digits))
  }
  return Intl.NumberFormat("en-US").format(soChia).replace(rx, "$1") + `${!hidenSymbol ? item.symbol : ''}` || '' as string
}

export function _getLabelForSymbol(symbol = '') {
  const obj = {
    "btcusdt": 'BTC/USD',
    "ethusdt": "ETH/USD",
    "bnbusdt": "BNB/USD",
    "solusdt": "SOL/USD",
    "adausdt": "ADA/USD",
    "xrpusdt": "XRP/USD",
  } as Record<string, string>
  return obj[symbol] || ''
}
export function _getRealNameForSymbol(symbol = '') {
  const obj = {
    "btcusdt": 'BTC',
    "ethusdt": "ETH",
    "bnbusdt": "BNB",
    "solusdt": "SOL",
    "adausdt": "ADA",
    "xrpusdt": "XRP",
  } as Record<string, string>
  return obj[symbol] || ''
}

export function _createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}