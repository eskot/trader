tart

#hint: <b>Ask SLM Ribbon</b>\nThe Ask SLM Ribbon is a momentum indicator that uses a combination of three exponential moving averages. When the averages are in alinement, with the "superfast" moving average above the "fast" moving average and the fast moving average above the "slow" moving average, the momentum condition is positive. A "buy signal" is generated, with an up arrow, when above conditions are met and a "clear bar" occurs; with the low of that bar is above all of the moving averages. The positive momentum ends if the superfast moving average touches the fast moving average; then condition is considered neutral and an oppostive arrow will appear. Negative momentum and a "Sell signal" are the opposite of the bullish conditions. \n \n\n--------------------------------------------------------------------------------\nVolume bars can be colored to match the Chart by clicking on Style>Settings>Appearance>Common, and color symbol as ticks  \n

 
input price = close;

input superfast_length = 8;

input fast_length = 13;

input slow_length = 21;

input displace = 0;

 
def mov_avg8 = ExpAverage(price[-displace], superfast_length);

def mov_avg13 = ExpAverage(price[-displace], fast_length);

def mov_avg21 = ExpAverage(price[-displace], slow_length);

 
#moving averages

Plot Superfast = mov_avg8;

plot Fast = mov_avg13;

plot Slow = mov_avg21;

 
def buy = mov_avg8 > mov_avg13 and mov_avg13 > mov_avg21 and low > mov_avg8;

def stopbuy = mov_avg8 <= mov_avg13;

def buynow = !buy[1] and buy;

def buysignal = CompoundValue(1, if buynow and !stopbuy then 1 else if buysignal[1]==1 and stopbuy then 0 else buysignal[1], 0);

 
plot Buy_Signal = buysignal[1] == 0 and buysignal==1;

Buy_signal.setpaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

Buy_signal.setdefaultColor(color.dark_GREEN);

Buy_signal.hidetitle();

Alert(condition = buysignal[1] == 0 and buysignal == 1, text = "Buy Signal", sound = Sound.Bell, "alert type" = Alert.BAR);

 
plot Momentum_Down = buysignal[1] ==1 and buysignal==0;

Momentum_down.setpaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

Momentum_Down.setdefaultColor(color.plum);

Momentum_down.hidetitle();

Alert(condition = buysignal[1] == 1 and buysignal == 0, text = "Momentum_Down", sound = Sound.Bell, "alert type" = Alert.BAR);

 
def sell = mov_avg8 < mov_avg13 and mov_avg13 < mov_avg21 and high < mov_avg8;

def stopsell = mov_avg8 >= mov_avg13;

def sellnow = !sell[1] and sell;

def sellsignal = CompoundValue(1, if sellnow and !stopsell then 1 else if sellsignal[1]==1 and stopsell then 0 else sellsignal[1], 0);

 
Plot Sell_Signal = sellsignal[1] ==0 and sellsignal;

Sell_signal.setpaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_down);

sell_signal.setDefaultColor(color.red);

Sell_signal.hidetitle();

Alert(condition = sellsignal[1] == 0 and sellsignal == 1, text = "Sell Signal", sound = Sound.Bell, "alert type" = Alert.BAR);

 
Plot Momentum_Up = sellsignal[1]==1 and sellSignal==0;

Momentum_up.setpaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_up);

Momentum_up.setDefaultColor(color.plum);

Momentum_up.hidetitle();

Alert(condition = sellsignal[1] == 1 and sellSignal == 0, text = "Momentum_Up", sound = Sound.Bell, "alert type" = Alert.BAR);

 
plot Colorbars = if buysignal ==1 then 1 else if sellsignal ==1 then 2 else if buysignal ==0 or sellsignal==0 then 3 else 0;

colorbars.hide();

Colorbars.definecolor("Buy_Signal_Bars", color.dark_green);

Colorbars.definecolor("Sell_Signal_Bars", color.red);

Colorbars.definecolor("Neutral", color.plum);

 
AssignPriceColor(if Colorbars ==1 then colorbars.color("buy_signal_bars") else if colorbars ==2 then colorbars.color("Sell_Signal_bars") else  colorbars.color("neutral"));

#end
