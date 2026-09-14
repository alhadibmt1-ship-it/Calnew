import { 
  DollarSign, 
  Heart, 
  RefreshCcw, 
  Calculator, 
  Calendar, 
  Type,
  Briefcase,
  HardHat,
  GraduationCap,
  Star
} from "lucide-react";

export interface CalculatorItem {
  name: string;
  description: string;
  formula?: string;
  example?: string;
 faq: [
  { question: "What is EMI and how is it calculated?", answer: "EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay a loan. It is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the number of months." },
  { question: "Does a higher down payment reduce EMI?", answer: "Yes. A higher down payment reduces the principal loan amount, which directly lowers your EMI and the total interest you pay over the loan tenure." },
  { question: "What happens if I miss an EMI payment?", answer: "Missing an EMI payment typically results in a late fee, a negative mark on your credit report, and potential penalty interest charges. Consistent missed payments can lead to loan default." }
]
 
// Mortgage Calculator
faq: [
  { question: "What is included in a monthly mortgage payment?", answer: "A typical mortgage payment includes principal (repayment of the loan), interest (cost of borrowing), property taxes, and homeowners insurance — often abbreviated as PITI." },
  { question: "How does the loan term affect my mortgage payment?", answer: "A shorter loan term (e.g. 15 years) means higher monthly payments but significantly less total interest paid. A 30-year mortgage has lower monthly payments but costs much more in interest over time." },
  { question: "What is the difference between fixed and adjustable rate mortgages?", answer: "A fixed-rate mortgage keeps the same interest rate for the entire loan term, giving predictable payments. An adjustable-rate mortgage (ARM) starts with a lower rate that can change periodically based on market conditions." }
]
 
// Auto Loan Calculator
faq: [
  { question: "What factors affect my auto loan monthly payment?", answer: "Your monthly car payment depends on the vehicle price, down payment, trade-in value, loan term (months), and interest rate (APR). A larger down payment or shorter term reduces the total amount financed." },
  { question: "Should I choose a longer or shorter auto loan term?", answer: "A shorter term (36-48 months) means higher monthly payments but less total interest paid. A longer term (60-72 months) lowers monthly payments but increases overall cost and risks the car being worth less than the loan balance." },
  { question: "What is a good interest rate for an auto loan?", answer: "Auto loan rates vary by credit score. As of 2026, excellent credit (720+) typically qualifies for rates under 5%, while fair credit (600-660) may see rates of 10-15% or higher." }
]
 
// Simple Interest Calculator
faq: [
  { question: "What is the formula for simple interest?", answer: "Simple Interest = Principal × Rate × Time (I = P × r × t). For example, $1,000 at 5% for 3 years earns $150 in simple interest." },
  { question: "When is simple interest used in real life?", answer: "Simple interest is commonly used for short-term personal loans, auto loans, certificates of deposit, and some savings accounts." },
  { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest, so it grows faster over time." }
]
 
// Compound Interest Calculator
faq: [
  { question: "What is compound interest?", answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This makes your money grow exponentially over time rather than linearly." },
  { question: "How does compounding frequency affect returns?", answer: "More frequent compounding generates slightly higher returns. Daily compounding earns slightly more than monthly, which earns more than annual compounding on the same principal and rate." },
  { question: "What is the Rule of 72?", answer: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your annual interest rate — at 6%, your money doubles in approximately 12 years." }
]
 
// Amortization Calculator
faq: [
  { question: "What is a loan amortization schedule?", answer: "An amortization schedule is a table showing each periodic payment on a loan, broken down into principal and interest portions. Early payments are mostly interest; later payments shift toward principal." },
  { question: "How do extra payments affect amortization?", answer: "Making extra principal payments shortens the loan term and reduces total interest paid significantly. Even small additional monthly payments can save thousands over the life of a loan." },
  { question: "Why do I pay more interest at the start of my loan?", answer: "Because interest is calculated on the outstanding balance. At the start, your balance is highest, so interest charges are highest. As you pay down principal, the interest portion decreases with each payment." }
]
 
// Investment Calculator
faq: [
  { question: "How is investment growth calculated?", answer: "Investment growth is calculated using the compound interest formula: FV = PV × (1 + r)^n, where FV is future value, PV is present value, r is the periodic return rate, and n is the number of periods." },
  { question: "What is the average stock market return?", answer: "The US stock market (S&P 500) has historically returned approximately 10% annually on average before inflation, or around 7% after inflation adjustment, though individual years vary widely." },
  { question: "How does starting early affect investment growth?", answer: "Starting earlier dramatically increases investment growth due to compounding. $10,000 invested at age 25 at 7% annual return grows to about $150,000 by age 65, while the same investment at 35 grows to only $76,000." }
]
 
// Retirement Calculator
faq: [
  { question: "How much do I need to retire?", answer: "A common guideline is the 4% rule — you need 25 times your annual expenses saved. For example, if you need $60,000/year in retirement, aim for $1.5 million in savings." },
  { question: "When should I start saving for retirement?", answer: "As early as possible. Due to compound growth, money saved in your 20s is worth significantly more at retirement than money saved in your 40s. Even small contributions early make a large difference." },
  { question: "What is the difference between a 401k and an IRA?", answer: "A 401k is employer-sponsored with higher contribution limits ($23,000 in 2026). An IRA is individually opened with lower limits ($7,000 in 2026) but more investment choices. Both offer tax advantages." }
]
 
// Salary Calculator
faq: [
  { question: "How is take-home pay calculated?", answer: "Take-home pay = Gross salary minus federal income tax, state income tax, Social Security tax (6.2%), Medicare tax (1.45%), and any pre-tax deductions like health insurance or 401k contributions." },
  { question: "What is the difference between gross and net salary?", answer: "Gross salary is your total pay before any deductions. Net salary (take-home pay) is what you actually receive after taxes and other deductions are subtracted." },
  { question: "How do pre-tax deductions reduce my tax bill?", answer: "Pre-tax deductions like 401k contributions and health insurance premiums are subtracted from your gross income before taxes are calculated, reducing your taxable income and overall tax liability." }
]
 
// Tax Calculator
faq: [
  { question: "How does the US progressive tax system work?", answer: "The US uses a progressive tax system with multiple brackets. You pay the lowest rate on income up to the first threshold, a higher rate on the next portion, and so on. Your marginal rate only applies to income above each threshold, not all your income." },
  { question: "What is the difference between a tax deduction and a tax credit?", answer: "A tax deduction reduces your taxable income (saving you a percentage of the deduction). A tax credit directly reduces your tax bill dollar-for-dollar and is therefore more valuable." },
  { question: "Should I take the standard deduction or itemize?", answer: "Choose whichever gives you the larger deduction. Itemizing makes sense if your combined deductible expenses (mortgage interest, state taxes, charitable donations) exceed the standard deduction for your filing status." }
]
 
// BMI Calculator
faq: [
  { question: "What do BMI ranges mean?", answer: "BMI ranges: Under 18.5 = Underweight; 18.5-24.9 = Normal weight; 25-29.9 = Overweight; 30 and above = Obese. These are general guidelines and may not apply equally to all body types." },
  { question: "Is BMI accurate for everyone?", answer: "BMI has limitations — it doesn't account for muscle mass, bone density, age, sex, or body composition. Athletes with high muscle mass may have a high BMI but low body fat. It's best used as a general screening tool alongside other health measures." },
  { question: "How can I lower my BMI?", answer: "BMI is reduced by lowering body weight through a combination of caloric deficit (consuming fewer calories than you burn) and regular physical activity. A sustainable loss of 0.5-1kg per week is generally recommended." }
]
 
// Calorie Calculator
faq: [
  { question: "How are daily calorie needs calculated?", answer: "Daily calorie needs are calculated using the Mifflin-St Jeor or Harris-Benedict equation to find your Basal Metabolic Rate (BMR), then multiplying by an activity factor ranging from 1.2 (sedentary) to 1.9 (very active)." },
  { question: "How many calories should I eat to lose weight?", answer: "A calorie deficit of 500 calories per day generally leads to about 0.5kg of weight loss per week. Most health professionals recommend not going below 1,200 calories/day for women or 1,500 for men without medical supervision." },
  { question: "Do macronutrients affect weight loss beyond calories?", answer: "While total calories matter most for weight change, macronutrient composition affects satiety, muscle preservation, and metabolic rate. Higher protein intake generally helps preserve muscle mass during a calorie deficit." }
]
 
// Age Calculator
faq: [
  { question: "How is age calculated exactly?", answer: "Age is calculated by finding the difference between the current date and your birth date, accounting for leap years and the exact number of days, months, and years that have passed." },
  { question: "Why might my age calculation differ on my birthday?", answer: "Age changes on the exact day of your birthday. Before your birthday in the current year, you are still your previous age. The calculator uses today's date to determine whether your birthday has occurred yet this year." },
  { question: "Can I calculate age between two specific dates?", answer: "Yes — enter any two dates to calculate the exact time elapsed between them in years, months, and days, useful for contract durations, anniversaries, or historical calculations." }
]
 
// Percentage Calculator
faq: [
  { question: "How do I calculate what percentage one number is of another?", answer: "Divide the part by the whole and multiply by 100. For example, 30 is 60% of 50 because (30 ÷ 50) × 100 = 60%." },
  { question: "How do I calculate percentage increase or decrease?", answer: "Percentage change = ((New Value - Old Value) / Old Value) × 100. A positive result is an increase; a negative result is a decrease." },
  { question: "How do I find a percentage of a number?", answer: "Multiply the number by the percentage divided by 100. For example, 20% of 350 = 350 × 0.20 = 70." }
]
 
// Grade Calculator
faq: [
  { question: "How is a weighted grade calculated?", answer: "A weighted grade multiplies each assignment score by its weight (importance), sums the results, then divides by the total weight. For example, an exam worth 40% and a quiz worth 10% contribute proportionally to your final grade." },
  { question: "What GPA does each letter grade correspond to?", answer: "Standard GPA conversion: A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D = 1.0, F = 0.0." },
  { question: "How much will one assignment affect my overall grade?", answer: "This depends on the assignment's weight. A single assignment worth 5% of your grade has a small impact, while a final exam worth 40% can significantly shift your overall score either way." }
]
 
// GPA Calculator
faq: [
  { question: "How is GPA calculated?", answer: "GPA = Sum of (Grade Points × Credit Hours) / Total Credit Hours. Each letter grade has a point value (A=4.0, B=3.0, etc.), and courses with more credits have a larger impact on your GPA." },
  { question: "What is the difference between weighted and unweighted GPA?", answer: "Unweighted GPA uses a standard 4.0 scale regardless of course difficulty. Weighted GPA gives extra points for harder courses like AP or IB classes, allowing GPAs above 4.0." },
  { question: "How can I raise my GPA?", answer: "Focus on courses with more credit hours since they impact GPA more. Retaking failed courses, maintaining consistent performance, and improving in your weakest subjects are the most effective strategies." }
]
 
// Attendance Calculator
faq: [
  { question: "How is attendance percentage calculated?", answer: "Attendance % = (Classes Attended / Total Classes) × 100. For example, attending 42 out of 50 classes gives 84% attendance." },
  { question: "What is the minimum attendance required?", answer: "Most educational institutions require a minimum of 75% attendance to be eligible for exams. Some universities require 85% or higher. Check your institution's specific policy." },
  { question: "How many classes can I miss and still maintain minimum attendance?", answer: "This depends on the total number of classes. Our calculator shows exactly how many more absences are allowed before falling below your target attendance percentage." }
]
 
// Date Calculator
faq: [
  { question: "How do I calculate the number of days between two dates?", answer: "Subtract the earlier date from the later date. Our calculator accounts for different month lengths and leap years to give the exact number of days, weeks, and months between any two dates." },
  { question: "How do I add or subtract days from a date?", answer: "Enter your starting date and the number of days to add or subtract. The calculator returns the resulting date, automatically accounting for month boundaries and leap years." },
  { question: "What is the difference between business days and calendar days?", answer: "Calendar days count every day including weekends and holidays. Business days count only weekdays (Monday to Friday), excluding weekends. Most financial and legal deadlines use business days." }
]
 
// Time Calculator
faq: [
  { question: "How do I add or subtract time values?", answer: "Enter time values in hours, minutes, and seconds format. The calculator handles carries — for example, adding 45 minutes to 1:30 correctly returns 2:15." },
  { question: "How do I convert hours and minutes to decimal format?", answer: "Divide minutes by 60 and add to hours. For example, 2 hours 30 minutes = 2.5 hours. This is useful for payroll and billing calculations." },
  { question: "How do I calculate the duration between two times?", answer: "Enter the start time and end time. The calculator finds the difference in hours, minutes, and seconds. For times spanning midnight, the calculator correctly handles the next-day rollover." }
]
 
// Hours Calculator
faq: [
  { question: "How do I calculate total hours worked?", answer: "Subtract your clock-in time from your clock-out time for each day, accounting for any break time. Add the daily totals for the week. Our calculator does this automatically when you enter start, end, and break times." },
  { question: "How are overtime hours calculated?", answer: "In the US, overtime applies to hours worked beyond 40 hours in a workweek, typically paid at 1.5× the regular rate. Some states also require daily overtime for hours beyond 8 in a single day." },
  { question: "How do I handle overnight shifts in a hours calculator?", answer: "For shifts that cross midnight, enter the end time as being on the next day. Our calculator detects when end time is earlier than start time and automatically adds 24 hours to calculate the correct duration." }
]
 
// Tip Calculator
faq: [
  { question: "What is the standard tip percentage?", answer: "Standard tipping in the US is 15-20% for restaurants, 15% for taxi/rideshare, 15-20% for hair salons, and $1-2 per drink at bars. High-end restaurants or exceptional service often warrants 20-25%." },
  { question: "Should I tip on the pre-tax or post-tax amount?", answer: "Tipping on the pre-tax amount is technically correct, though many people tip on the total bill for simplicity. The difference is usually small." },
  { question: "How do I split a bill with a tip evenly?", answer: "Add the tip amount to the total bill, then divide by the number of people. Our calculator lets you enter the bill amount, tip percentage, and number of people to get the exact amount each person owes." }
]
 
// Discount Calculator
faq: [
  { question: "How do I calculate the price after a discount?", answer: "Discounted Price = Original Price × (1 - Discount%). For example, 30% off $80 = $80 × 0.70 = $56." },
  { question: "How do I calculate the original price from a discounted price?", answer: "Original Price = Discounted Price / (1 - Discount%). If you paid $56 after a 30% discount, the original price was $56 / 0.70 = $80." },
  { question: "How do I calculate what percentage off a sale price is?", answer: "Discount% = ((Original Price - Sale Price) / Original Price) × 100. If an item dropped from $120 to $90, the discount is ($30 / $120) × 100 = 25% off." }
]
 
// Break Even Calculator
faq: [
  { question: "What is the break-even point?", answer: "The break-even point is the level of sales at which total revenue equals total costs — neither profit nor loss. It is calculated as: Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)." },
  { question: "What are fixed vs variable costs?", answer: "Fixed costs stay constant regardless of production volume (rent, salaries, insurance). Variable costs change with output (raw materials, packaging, commissions). Understanding both is essential for break-even analysis." },
  { question: "How can I lower my break-even point?", answer: "Reduce fixed costs (downsize office, renegotiate contracts), reduce variable costs (bulk purchasing, process efficiency), or increase your selling price. A higher contribution margin per unit means you need fewer sales to break even." }
]
 
// ROI Calculator
faq: [
  { question: "How is ROI calculated?", answer: "ROI = ((Net Profit / Cost of Investment) × 100). For example, investing $1,000 and earning $1,200 back gives an ROI of 20%." },
  { question: "What is a good ROI?", answer: "A good ROI depends on the industry and risk level. The S&P 500 averages about 10% annually. Real estate typically returns 8-12%. Any investment should beat inflation (historically 2-3%) to have real value." },
  { question: "What is the difference between ROI and ROE?", answer: "ROI (Return on Investment) measures profitability relative to the total investment cost. ROE (Return on Equity) measures profitability relative to shareholders' equity and is used specifically for evaluating company performance." }
]
 
// Profit Margin Calculator
faq: [
  { question: "What is profit margin?", answer: "Profit margin is the percentage of revenue that represents profit. Gross margin = (Revenue - COGS) / Revenue × 100. Net margin includes all expenses. Higher margins indicate a more profitable business." },
  { question: "What is a good profit margin?", answer: "Profit margins vary widely by industry. SaaS companies often achieve 70%+ gross margins. Retail typically sees 2-5% net margins. Restaurants average 3-9%. Compare margins to industry benchmarks rather than a universal standard." },
  { question: "What is the difference between markup and margin?", answer: "Markup is calculated on cost (Markup = Profit / Cost). Margin is calculated on revenue (Margin = Profit / Revenue). A 50% markup on a $10 item means a $5 profit, but the margin is only 33.3% of the $15 selling price." }
]
 
// Net Profit Calculator
faq: [
  { question: "How is net profit calculated?", answer: "Net Profit = Total Revenue - Total Expenses (including COGS, operating expenses, taxes, and interest). It represents the actual profit left after all costs are deducted." },
  { question: "What is the difference between gross profit and net profit?", answer: "Gross profit subtracts only the direct cost of goods sold from revenue. Net profit subtracts all expenses including operating costs, taxes, depreciation, and interest — giving the true bottom-line profit." },
  { question: "Can a business have a positive gross profit but negative net profit?", answer: "Yes. A business can generate gross profit but still lose money if operating expenses (salaries, rent, marketing) or debt interest payments exceed the gross profit. This is common in early-stage companies." }
]
 
// Currency Converter
faq: [
  { question: "How often are exchange rates updated?", answer: "Major currency exchange rates fluctuate continuously during weekday trading hours. Our converter uses regularly updated rates to provide accurate conversions. For critical financial transactions, always verify with your bank or broker." },
  { question: "Why do bank exchange rates differ from online rates?", answer: "Banks add a spread (markup) to the mid-market exchange rate to cover their costs and profit. This spread is why you get fewer foreign currency units when exchanging at a bank compared to the mid-market rate shown online." },
  { question: "What is the mid-market exchange rate?", answer: "The mid-market rate is the midpoint between buy and sell prices in the global currency market — essentially the 'true' exchange rate with no markup. It's the rate you see on financial data sites and what our converter displays." }
]
 
// GST VAT Calculator
faq: [
  { question: "What is the difference between GST and VAT?", answer: "Both are consumption taxes on goods and services. GST (Goods and Services Tax) is used in countries like India, Australia, and Canada. VAT (Value Added Tax) is used in the EU, UK, UAE, and many other countries. They function similarly but differ by jurisdiction and rate." },
  { question: "How do I calculate GST/VAT-inclusive vs GST/VAT-exclusive prices?", answer: "Exclusive (add tax): Total = Price × (1 + Rate%). Inclusive (extract tax): Tax = Total × Rate / (100 + Rate). For example, extracting 18% GST from ₹118: GST = ₹118 × 18/118 = ₹18." },
  { question: "Can businesses claim GST/VAT back?", answer: "Yes, registered businesses can typically claim input tax credits — recovering GST/VAT paid on business purchases from the tax they collect on sales. Only the end consumer ultimately bears the tax cost." }
]
 
// Gratuity Calculator
faq: [
  { question: "How is end-of-service gratuity calculated in the UAE?", answer: "Under UAE Labour Law: for the first 5 years, gratuity = 21 days' basic salary per year. Beyond 5 years, it's 30 days' basic salary per year. If the employee resigns before 2 years, no gratuity is paid." },
  { question: "Is gratuity taxable?", answer: "In most countries including UAE and India, gratuity is exempt from tax up to a certain limit. In India, gratuity up to ₹20 lakh is tax-exempt for private sector employees." },
  { question: "What is the difference between gratuity and provident fund?", answer: "Gratuity is a lump sum paid by the employer at the end of employment as recognition of service. Provident fund is a retirement savings scheme where both employer and employee contribute monthly throughout the employment period." }
]
 
// Body Fat Calculator
faq: [
  { question: "How is body fat percentage measured?", answer: "Body fat can be measured using DEXA scans (most accurate), hydrostatic weighing, skinfold calipers, bioelectrical impedance, or estimated formulas using measurements like neck, waist, and hip circumference (US Navy method)." },
  { question: "What is a healthy body fat percentage?", answer: "For men: essential fat 2-5%, athletes 6-13%, fitness 14-17%, acceptable 18-24%, obese 25%+. For women: essential fat 10-13%, athletes 14-20%, fitness 21-24%, acceptable 25-31%, obese 32%+." },
  { question: "What is the difference between BMI and body fat percentage?", answer: "BMI uses only height and weight, ignoring body composition. Body fat percentage directly measures the proportion of fat in your body. An athlete can have a high BMI with low body fat, making body fat percentage a more accurate health indicator." }
]
 
// Water Intake Calculator
faq: [
  { question: "How much water should I drink per day?", answer: "A common guideline is 8 cups (2 liters) per day, but actual needs vary by body weight, activity level, climate, and health status. A general formula is 30-35ml per kilogram of body weight." },
  { question: "Does coffee and tea count toward daily water intake?", answer: "Yes, caffeinated beverages still contribute to hydration, though caffeine has a mild diuretic effect. Fruits and vegetables with high water content also contribute significantly to your daily fluid intake." },
  { question: "How do I know if I'm drinking enough water?", answer: "The simplest indicator is urine color — pale yellow indicates adequate hydration, dark yellow suggests dehydration, and colorless may indicate overhydration. Thirst is also a reliable indicator for healthy adults." }
]
 
// Macro Calculator
faq: [
  { question: "What are macronutrients?", answer: "Macronutrients are the three main nutrients that provide energy: protein (4 calories/gram), carbohydrates (4 calories/gram), and fat (9 calories/gram). Tracking macros helps optimize body composition, performance, and health goals." },
  { question: "What macro ratio should I follow?", answer: "Common ratios: balanced diet (30% protein, 40% carbs, 30% fat), keto (75% fat, 20% protein, 5% carbs), high protein for muscle building (35% protein, 45% carbs, 20% fat). The best ratio depends on your specific goals." },
  { question: "Should I count macros or just calories?", answer: "Counting calories determines whether you gain, lose, or maintain weight. Tracking macros additionally optimizes body composition — ensuring enough protein to preserve muscle, appropriate carbs for energy, and healthy fats for hormones." }
]
 
// Ideal Weight Calculator
faq: [
  { question: "How is ideal weight calculated?", answer: "Several formulas estimate ideal weight based on height. The Devine Formula (commonly used in medicine) calculates: Men = 50kg + 2.3kg per inch over 5 feet; Women = 45.5kg + 2.3kg per inch over 5 feet." },
  { question: "Is ideal weight the same for men and women of the same height?", answer: "No. Men generally have higher ideal weights than women at the same height due to greater average muscle mass and denser bone structure." },
  { question: "Should ideal weight be my goal weight?", answer: "Ideal weight formulas provide a general reference, not a strict target. A healthy weight range considers body composition, fitness level, age, and individual build. Consult a healthcare provider for personalized goals." }
]
 
// Pregnancy Due Date Calculator
faq: [
  { question: "How is the due date calculated?", answer: "The standard due date is calculated as 280 days (40 weeks) from the first day of your last menstrual period (LMP). This is called Naegele's Rule. About 5% of babies are born on their exact due date." },
  { question: "How accurate is a due date based on LMP?", answer: "LMP-based due dates are estimates. A first-trimester ultrasound (8-12 weeks) provides a more accurate due date by measuring fetal size. Most babies are born within 2 weeks before or after their due date." },
  { question: "How do irregular periods affect due date calculation?", answer: "Standard calculations assume a 28-day cycle. If your cycle is longer or shorter, ovulation and conception timing shift accordingly. Ultrasound dating is more reliable than LMP calculation for irregular cycles." }
]
 
// Ovulation Calculator
faq: [
  { question: "How is ovulation date estimated?", answer: "Ovulation typically occurs 14 days before your next period. With a 28-day cycle, this is around day 14. For longer or shorter cycles, the ovulation date shifts accordingly — our calculator adjusts for your specific cycle length." },
  { question: "What is the fertile window?", answer: "The fertile window is the period when conception is possible — roughly 5 days before ovulation through 1 day after. Sperm can survive up to 5 days inside the body, and an egg is viable for 12-24 hours after release." },
  { question: "Can stress affect ovulation timing?", answer: "Yes. Stress, illness, extreme exercise, significant weight changes, and hormonal disruptions can delay or suppress ovulation, making cycles irregular. Consistent ovulation tracking over several cycles provides more reliable predictions." }
]
 
// Scientific Calculator
faq: [
  { question: "What functions does a scientific calculator include?", answer: "A scientific calculator includes standard arithmetic plus trigonometric functions (sin, cos, tan), logarithms (log, ln), exponents, roots, factorial, constants (π, e), and often statistical functions." },
  { question: "What is the order of operations in calculator math?", answer: "Order of operations follows PEMDAS/BODMAS: Parentheses/Brackets first, then Exponents/Orders, then Multiplication and Division (left to right), then Addition and Subtraction (left to right)." },
  { question: "When would I need a scientific calculator instead of a basic one?", answer: "You need a scientific calculator for trigonometry, calculus, physics, chemistry, engineering, and any math involving logarithms, exponents, or specialized functions beyond basic arithmetic." }
]
 
// Percentage Calculator
faq: [
  { question: "How do I calculate percentage of a number?", answer: "Multiply the number by the percentage divided by 100. Example: 15% of 200 = 200 × (15/100) = 30." },
  { question: "How do I calculate percentage change?", answer: "Percentage Change = ((New Value - Old Value) / |Old Value|) × 100. A positive result is an increase; negative is a decrease." },
  { question: "How do I find what percentage one number is of another?", answer: "(Part / Whole) × 100 = Percentage. For example, 45 is what percent of 180? (45/180) × 100 = 25%." }
]
 
// Fraction Calculator
faq: [
  { question: "How do you add fractions with different denominators?", answer: "Find the Least Common Denominator (LCD), convert both fractions to equivalent fractions with that denominator, then add the numerators. Example: 1/3 + 1/4 = 4/12 + 3/12 = 7/12." },
  { question: "How do you multiply fractions?", answer: "Multiply numerators together and denominators together. Example: 2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2. Simplify by dividing both by their greatest common factor." },
  { question: "How do you divide fractions?", answer: "Flip (reciprocal) the second fraction and multiply. Example: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6." }
]
 
// Algebra Calculator / Algebra Solver
faq: [
  { question: "How do I solve a linear equation?", answer: "Isolate the variable by performing the same operations on both sides. Example: 3x + 5 = 20 → 3x = 15 → x = 5." },
  { question: "What is the quadratic formula?", answer: "For ax² + bx + c = 0, the solutions are x = (-b ± √(b²-4ac)) / 2a. The discriminant (b²-4ac) determines the number of solutions: positive = two real roots, zero = one root, negative = no real roots." },
  { question: "How do I solve a system of two equations?", answer: "Use substitution (solve one equation for one variable and substitute into the other) or elimination (add/subtract equations to cancel one variable). Both methods give the same solution." }
]
 
// Standard Deviation Calculator
faq: [
  { question: "What does standard deviation measure?", answer: "Standard deviation measures how spread out data points are from the mean. A low standard deviation means data is clustered close to the average; a high standard deviation means data is more spread out." },
  { question: "What is the difference between population and sample standard deviation?", answer: "Population standard deviation divides by N (used when you have complete data). Sample standard deviation divides by N-1 (used when your data is a sample from a larger population), giving a slightly larger result." },
  { question: "What is the 68-95-99.7 rule for standard deviation?", answer: "In a normal distribution: 68% of data falls within 1 standard deviation of the mean, 95% within 2 standard deviations, and 99.7% within 3 standard deviations. This is also called the empirical rule." }
]
 
// Probability Calculator
faq: [
  { question: "How is basic probability calculated?", answer: "Probability = Number of Favorable Outcomes / Total Possible Outcomes. For example, rolling a 4 on a die: 1 favorable outcome / 6 total outcomes = 1/6 ≈ 16.7%." },
  { question: "What is the difference between independent and dependent events?", answer: "Independent events don't affect each other (like flipping two coins). Dependent events do (like drawing cards without replacement). For independent events, multiply probabilities. For dependent events, adjust probabilities at each step." },
  { question: "What is the difference between combination and permutation?", answer: "A permutation counts arrangements where order matters (e.g. passwords). A combination counts selections where order doesn't matter (e.g. lottery numbers). Permutations are always ≥ combinations for the same inputs." }
]
 
// Concrete Calculator
faq: [
  { question: "How do I calculate how much concrete I need?", answer: "Calculate the volume of the area: Length × Width × Depth (in meters or feet). Convert to cubic yards or cubic meters. Add 10% extra for waste and overpour. Our calculator does this automatically." },
  { question: "How many bags of concrete mix do I need?", answer: "An 80lb bag of premixed concrete covers approximately 0.6 cubic feet. Divide your total cubic footage by 0.6 to estimate the number of bags needed, then add 10% for waste." },
  { question: "How long does concrete take to cure?", answer: "Concrete reaches about 70% of its strength in 7 days and 99% in 28 days. It is considered 'set' after 24-48 hours but should not bear full load for at least 7 days. Temperature and humidity affect curing time." }
]
 
// Mortgage Payoff Calculator
faq: [
  { question: "How much time and money can extra mortgage payments save?", answer: "Even small additional monthly principal payments can save tens of thousands in interest and shorten a 30-year mortgage by years. For example, an extra $200/month on a $300,000 mortgage at 6.5% saves over $70,000 in interest." },
  { question: "Is it better to make bi-weekly payments or extra monthly payments?", answer: "Bi-weekly payments result in 26 half-payments per year (equivalent to 13 full monthly payments instead of 12), effectively making one extra full payment annually. Both strategies reduce principal faster and save significant interest." },
  { question: "Should I pay off my mortgage early or invest the extra money?", answer: "If your mortgage rate is lower than your expected investment return, investing may generate more wealth. If your mortgage rate is high or you prioritize debt-free security, early payoff makes sense. The decision also depends on tax deductibility and personal risk tolerance." }
]
 
// Password Generator
faq: [
  { question: "What makes a password strong?", answer: "A strong password is at least 12-16 characters long and uses a mix of uppercase and lowercase letters, numbers, and special characters. It avoids dictionary words, personal information, and common substitutions like '@' for 'a'." },
  { question: "How often should I change my passwords?", answer: "Modern security guidance recommends changing passwords when there's reason to believe they're compromised, rather than on a fixed schedule. Use unique passwords for every account and enable two-factor authentication where possible." },
  { question: "Is it safe to use a password generator?", answer: "Yes, when using a reputable tool. Our password generator runs entirely in your browser — no passwords are stored or transmitted. Always use unique passwords for different accounts and store them in a trusted password manager." }
]
 
// QR Code Generator
faq: [
  { question: "What can a QR code contain?", answer: "QR codes can encode URLs, plain text, phone numbers, email addresses, Wi-Fi credentials, contact information (vCards), SMS messages, and more. The most common use is linking to a website URL." },
  { question: "How much data can a QR code store?", answer: "A standard QR code can hold up to 3,000 numeric characters, 2,000 alphanumeric characters, or about 1,800 bytes of binary data. The more data it contains, the denser and more complex the code appears." },
  { question: "Can QR codes be scanned if they are damaged?", answer: "Yes. QR codes include built-in error correction that allows them to be scanned even if up to 30% of the code is damaged or obscured, depending on the error correction level set when the code was generated." }
]
 
// Word Counter
faq: [
  { question: "How is word count calculated?", answer: "Words are counted by splitting text at spaces and punctuation marks. 'Hello, world!' counts as 2 words. Our counter provides total words, characters (with and without spaces), sentences, and estimated reading time." },
  { question: "What is the ideal word count for blog posts?", answer: "For SEO, long-form content of 1,500-2,500 words tends to rank better. For social media, shorter is better. For academic papers, follow the stated requirements. News articles typically run 300-800 words." },
  { question: "How do you calculate reading time?", answer: "Reading time is estimated at 200-250 words per minute for average adult readers. A 1,000-word article takes approximately 4-5 minutes to read. Our calculator uses 200 words per minute as the default rate." }
]
 
// Power Converter
faq: [
  { question: "What units of power can be converted?", answer: "Common power units include watts (W), kilowatts (kW), megawatts (MW), horsepower (hp), BTU per hour, and foot-pounds per second. All are measures of energy transfer per unit of time." },
  { question: "What is the difference between watts and kilowatts?", answer: "1 kilowatt = 1,000 watts. Kilowatts (kW) are used for household appliances and engines. Megawatts (MW) are used for power plants. Your electricity bill is typically measured in kilowatt-hours (kWh) — energy over time." },
  { question: "How many watts equals 1 horsepower?", answer: "1 mechanical horsepower = 745.7 watts. 1 metric horsepower = 735.5 watts. Horsepower is commonly used for engines and motors, while watts are the standard SI unit for power." }
]
 
// Temperature Converter
faq: [
  { question: "How do I convert Celsius to Fahrenheit?", answer: "°F = (°C × 9/5) + 32. For example: 100°C = (100 × 9/5) + 32 = 180 + 32 = 212°F." },
  { question: "How do I convert Fahrenheit to Celsius?", answer: "°C = (°F - 32) × 5/9. For example: 98.6°F = (98.6 - 32) × 5/9 = 66.6 × 0.556 = 37°C." },
  { question: "What is absolute zero in Celsius and Fahrenheit?", answer: "Absolute zero is 0 Kelvin = -273.15°C = -459.67°F. It is the theoretical lowest possible temperature where all molecular motion stops." }
]
 
// Length Converter
faq: [
  { question: "How many centimeters are in an inch?", answer: "1 inch = 2.54 centimeters exactly. This is the internationally defined standard conversion between the metric and imperial systems." },
  { question: "How many feet are in a meter?", answer: "1 meter = 3.28084 feet. Conversely, 1 foot = 0.3048 meters. In everyday rounding, 1 meter is approximately 3 feet 3 inches." },
  { question: "How many kilometers are in a mile?", answer: "1 mile = 1.60934 kilometers. 1 kilometer = 0.62137 miles. A quick approximation is that 8 kilometers ≈ 5 miles." }
]
 
// Weight Converter
faq: [
  { question: "How many grams are in a pound?", answer: "1 pound = 453.592 grams. 1 kilogram = 2.20462 pounds. For everyday use, 1 pound ≈ 454 grams and 1 kg ≈ 2.2 pounds." },
  { question: "How many ounces are in a pound?", answer: "There are exactly 16 avoirdupois ounces in 1 pound. This is the standard weight unit used in the US for everyday items." },
  { question: "How many kilograms are in a stone?", answer: "1 stone = 14 pounds = 6.35029 kilograms. Stones are commonly used to measure body weight in the UK and Ireland." }
]
 
// Speed Converter
faq: [
  { question: "How do I convert kilometers per hour to miles per hour?", answer: "Multiply km/h by 0.62137 to get mph. For a quick approximation, multiply by 0.6. For example, 100 km/h ≈ 62 mph." },
  { question: "What is the speed of sound in different units?", answer: "The speed of sound in air at sea level is approximately 343 m/s, 1,235 km/h, or 767 mph at 20°C. This speed varies with temperature, altitude, and the medium (solid, liquid, gas)." },
  { question: "How fast is 1 knot in km/h?", answer: "1 knot = 1.852 km/h = 1.151 mph. Knots are used in maritime and aviation contexts, defined as one nautical mile per hour." }
]
 
// Volume Converter
faq: [
  { question: "How many liters are in a gallon?", answer: "1 US gallon = 3.78541 liters. 1 UK (imperial) gallon = 4.54609 liters. The US and UK gallons are different, so always check which system is being used." },
  { question: "How many milliliters are in a cup?", answer: "1 US cup = 236.588 ml. 1 metric cup (used in Australia and Canada) = 250 ml. 1 UK cup = 284 ml. US measurements are most common in recipes globally." },
  { question: "How many teaspoons are in a tablespoon?", answer: "1 tablespoon = 3 teaspoons in both the US and metric systems. 1 US tablespoon = 14.79 ml. 1 metric tablespoon = 15 ml." }
]
 
// Tile Calculator
faq: [
  { question: "How many tiles do I need for a room?", answer: "Calculate room area (Length × Width), then divide by tile area. Add 10-15% for cuts and breakage. Our calculator does this automatically — enter your room dimensions and tile size to get the exact count." },
  { question: "How much tile wastage should I account for?", answer: "Add 10% for simple rectangular rooms with straight cuts. Add 15% for diagonal patterns, rooms with many corners, or large tiles. Add 20% for complex patterns like herringbone." },
  { question: "What grout line width should I use?", answer: "Small tiles (under 4 inches): 1/8 inch grout lines. Medium tiles (4-8 inches): 3/16 inch. Large tiles (over 8 inches): 1/4 to 3/8 inch. Rectified tiles can use narrower grout lines than traditional tiles." }
]
 
// Concrete/Brick/Construction Calculators (generalized)
faq: [
  { question: "How much extra material should I order for construction?", answer: "Always order 10-15% more than calculated to account for cuts, breakage, measurement errors, and future repairs. Ordering less and returning unused material is usually more costly than ordering extra from the start." },
  { question: "How do I convert between cubic yards and cubic feet?", answer: "1 cubic yard = 27 cubic feet. Divide cubic feet by 27 to get cubic yards, or multiply cubic yards by 27 for cubic feet. Concrete is typically sold in cubic yards in the US." },
  { question: "Why do my material calculations differ from contractor estimates?", answer: "Contractors account for practical factors like waste, overlap, substrate issues, and safety margins. Our calculator gives theoretical quantities — always add a 10-15% buffer and get multiple quotes." }
]
 
// Numerology / Astrology Calculators
faq: [
  { question: "How are numerology numbers calculated?", answer: "Numerology reduces numbers to single digits (1-9) or master numbers (11, 22, 33) by adding digits together repeatedly. For example, birth date 29/5/1990: 2+9+5+1+9+9+0 = 35 → 3+5 = 8 (Life Path Number 8)." },
  { question: "What does a life path number represent?", answer: "Your life path number (derived from your birth date) is considered the most important number in numerology. It represents your life's purpose, natural talents, and the opportunities and challenges you'll encounter." },
  { question: "Is numerology scientifically proven?", answer: "Numerology is not scientifically validated. It is a metaphysical belief system practiced across many cultures. Our calculator presents results for entertainment and self-reflection purposes only." }
]
 
