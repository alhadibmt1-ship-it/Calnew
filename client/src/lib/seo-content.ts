interface ReferenceTable {
  title: string;
  headers: string[];
  rows: string[][];
}

interface ContentSection {
  title: string;
  content: string;
}

export interface SEOContentSection {
  whatIs: string;
  whatIsExtra?: string[];
  howFormulaWorks: string;
  formulaBreakdown?: string[];
  howToUse: string[];
  exampleTitle: string;
  exampleContent: string;
  tables?: ReferenceTable[];
  additionalSections?: ContentSection[];
  tips?: string[];
  limitations?: string[];
  relatedConcepts?: string[];
}

const contentTemplates: Record<string, SEOContentSection> = {
  "bmi-calculator": {
    whatIs: "The Body Mass Index (BMI) Calculator is a widely used health screening tool that estimates body fat based on your height and weight. BMI provides a simple numeric value that categorizes you as underweight, normal weight, overweight, or obese, helping you and your healthcare provider assess potential health risks.",
    whatIsExtra: [
      "BMI was devised by Belgian mathematician Adolphe Quetelet in the 1830s and has been used by the World Health Organization (WHO) since the 1980s as the standard for recording obesity statistics. While it does not directly measure body fat percentage, it correlates well with more direct measures of body fat such as underwater weighing and dual-energy X-ray absorptiometry (DEXA).",
      "Healthcare providers use BMI as a first-step screening tool. A BMI outside the normal range may prompt further assessments such as skinfold thickness measurements, diet evaluation, physical activity level assessment, and family health history reviews.",
    ],
    howFormulaWorks: "BMI = Weight (kg) ÷ Height (m)². For imperial units: BMI = (Weight in lbs × 703) ÷ (Height in inches)².",
    formulaBreakdown: [
      "Metric: BMI = weight in kilograms ÷ (height in meters)²",
      "Imperial: BMI = (weight in pounds × 703) ÷ (height in inches)²",
      "Example: 70 kg ÷ (1.75 m)² = 70 ÷ 3.0625 = 22.86",
    ],
    howToUse: [
      "Select your preferred unit system (Metric or Imperial)",
      "Enter your weight in kilograms or pounds",
      "Enter your height in centimeters or feet and inches",
      "Click Calculate to see your BMI value and category",
      "Review the BMI chart below to understand your health range",
    ],
    exampleTitle: "Example: Person weighing 70 kg at 175 cm tall",
    exampleContent: "BMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 = 22.86 kg/m² → Falls in the Normal weight range (18.5–24.9)",
    tables: [
      {
        title: "BMI Categories for Adults (WHO Classification)",
        headers: ["BMI Range", "Category", "Health Risk"],
        rows: [
          ["Below 16.0", "Severe Thinness", "Very High"],
          ["16.0 – 16.9", "Moderate Thinness", "High"],
          ["17.0 – 18.4", "Mild Thinness", "Moderate"],
          ["18.5 – 24.9", "Normal Weight", "Low"],
          ["25.0 – 29.9", "Overweight (Pre-obese)", "Increased"],
          ["30.0 – 34.9", "Obese Class I", "High"],
          ["35.0 – 39.9", "Obese Class II", "Very High"],
          ["40.0 and above", "Obese Class III (Morbid)", "Extremely High"],
        ],
      },
      {
        title: "Healthy Weight Ranges by Height",
        headers: ["Height", "Healthy Weight Range (BMI 18.5–24.9)"],
        rows: [
          ["5'0\" (152 cm)", "95 – 128 lbs (43 – 58 kg)"],
          ["5'3\" (160 cm)", "105 – 141 lbs (48 – 64 kg)"],
          ["5'6\" (168 cm)", "115 – 155 lbs (52 – 70 kg)"],
          ["5'9\" (175 cm)", "125 – 169 lbs (57 – 77 kg)"],
          ["6'0\" (183 cm)", "136 – 184 lbs (62 – 83 kg)"],
          ["6'3\" (191 cm)", "148 – 200 lbs (67 – 91 kg)"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Health Risks of Being Overweight",
        content: "Being overweight or obese significantly increases the risk of developing serious health conditions including: Type 2 diabetes, cardiovascular disease (heart attack, stroke), high blood pressure (hypertension), certain cancers (breast, colon, kidney), sleep apnea and breathing problems, osteoarthritis and joint problems, fatty liver disease, kidney disease, and pregnancy complications. Research shows that even a modest weight loss of 5–10% of body weight can improve blood pressure, cholesterol, and blood sugar levels.",
      },
      {
        title: "Health Risks of Being Underweight",
        content: "Being underweight (BMI below 18.5) also carries significant health risks including: malnutrition and vitamin deficiencies, weakened immune system, osteoporosis and bone fractures, anemia, fertility issues, growth and development problems in younger individuals, and increased surgical complications. If your BMI falls in the underweight category, consult a healthcare provider to rule out underlying conditions.",
      },
      {
        title: "BMI Prime",
        content: "BMI Prime is the ratio of your BMI to the upper limit of normal BMI (25 kg/m²). A BMI Prime of 1.0 means you are at the upper limit of normal weight. Values below 1.0 indicate normal or underweight, while values above 1.0 indicate overweight or obese. For example, a BMI of 22.5 gives a BMI Prime of 0.90 (22.5 ÷ 25). This makes it easy to see how far you are from the overweight threshold as a simple percentage.",
      },
      {
        title: "Ponderal Index",
        content: "The Ponderal Index (PI) is an alternative to BMI that uses the cube of height rather than the square: PI = weight (kg) ÷ height (m)³. The normal range for PI is approximately 11–15 kg/m³. The Ponderal Index is considered more reliable than BMI for very tall or very short individuals because it better accounts for the three-dimensional nature of the human body.",
      },
    ],
    tips: [
      "BMI is a screening tool, not a diagnostic tool — always consult a healthcare provider for a complete health assessment",
      "Measure your height and weight at the same time of day for consistency",
      "For children and teens (ages 2–20), BMI is interpreted using age- and sex-specific percentile charts",
      "Athletes may have a high BMI due to muscle mass, not excess fat",
    ],
    limitations: [
      "Does not distinguish between muscle mass and fat mass — muscular athletes may be classified as overweight",
      "Does not account for age, sex, ethnicity, or body composition differences",
      "May underestimate body fat in older adults who have lost muscle mass",
      "Not applicable to pregnant or breastfeeding women",
      "Does not indicate where fat is distributed (abdominal fat is more dangerous than fat on hips/thighs)",
      "Different ethnic groups may have different health risk thresholds — WHO suggests lower cutoffs for Asian populations (overweight at BMI ≥ 23)",
    ],
    relatedConcepts: ["Body Fat Percentage", "Basal Metabolic Rate (BMR)", "Waist-to-Hip Ratio", "TDEE Calculator", "Ideal Weight Calculator"],
  },

  "percentage-calculator": {
    whatIs: "The Percentage Calculator is a versatile mathematical tool that helps you solve all types of percentage problems. Whether you need to find what percentage one number is of another, calculate a percentage of a number, or determine percentage increase and decrease, this calculator handles it all instantly.",
    whatIsExtra: [
      "Percentages are used in virtually every aspect of daily life — from calculating sales tax and tips to understanding interest rates, investment returns, and grade scores. The word 'percent' comes from the Latin 'per centum,' meaning 'by the hundred.'",
      "Understanding percentages is essential for financial literacy. When a store advertises '30% off,' knowing how to quickly calculate the discount can save you money. When your bank offers a 4.5% APY savings account, understanding what that means in dollars helps you make informed decisions.",
    ],
    howFormulaWorks: "Basic: Percentage = (Part ÷ Whole) × 100. Increase: ((New − Old) ÷ Old) × 100. Decrease: ((Old − New) ÷ Old) × 100.",
    formulaBreakdown: [
      "What is X% of Y? → Answer = (X ÷ 100) × Y",
      "X is what % of Y? → Answer = (X ÷ Y) × 100",
      "Percentage change: ((New Value − Old Value) ÷ Old Value) × 100",
      "Finding the whole: Whole = Part ÷ (Percentage ÷ 100)",
    ],
    howToUse: [
      "Choose the type of percentage calculation you need",
      "Enter the known values in the input fields",
      "Click Calculate to see the result instantly",
      "Use the Clear button to start a new calculation",
    ],
    exampleTitle: "Common Percentage Calculations",
    exampleContent: "What is 15% of 200? → 30 | 45 is what % of 180? → 25% | Increase from 80 to 100? → 25% increase | 30% off $85? → You save $25.50, pay $59.50",
    tables: [
      {
        title: "Common Percentage Equivalents",
        headers: ["Fraction", "Decimal", "Percentage"],
        rows: [
          ["1/2", "0.5", "50%"],
          ["1/3", "0.333", "33.33%"],
          ["1/4", "0.25", "25%"],
          ["1/5", "0.2", "20%"],
          ["1/8", "0.125", "12.5%"],
          ["1/10", "0.1", "10%"],
          ["2/3", "0.667", "66.67%"],
          ["3/4", "0.75", "75%"],
        ],
      },
      {
        title: "Percentage Increase & Decrease Quick Reference",
        headers: ["Original", "10% Increase", "20% Increase", "25% Decrease", "50% Decrease"],
        rows: [
          ["$50", "$55", "$60", "$37.50", "$25"],
          ["$100", "$110", "$120", "$75", "$50"],
          ["$200", "$220", "$240", "$150", "$100"],
          ["$500", "$550", "$600", "$375", "$250"],
          ["$1,000", "$1,100", "$1,200", "$750", "$500"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Percentage in Finance",
        content: "In finance, percentages are used to express interest rates, returns on investment, inflation rates, and tax rates. A credit card with 22% APR means you pay 22% of your outstanding balance per year in interest. An investment that returns 8% annually doubles your money in approximately 9 years (Rule of 72: 72 ÷ 8 = 9). Sales tax of 8.5% on a $100 purchase adds $8.50 to your total.",
      },
      {
        title: "Percentage Points vs. Percentage Change",
        content: "A common source of confusion is the difference between percentage points and percentage change. If an interest rate goes from 5% to 7%, it increased by 2 percentage points, but the percentage change is 40% (because 2 ÷ 5 × 100 = 40%). This distinction is important in finance and statistics — news headlines often mix up the two.",
      },
    ],
    tips: [
      "To find 10% of any number, simply move the decimal point one place to the left",
      "To find 1% of any number, move the decimal point two places to the left",
      "To calculate tips: 15% = 10% + half of 10%; 20% = 10% × 2",
      "A price that goes up 50% and then down 50% does NOT return to the original price — it will be 25% lower",
    ],
    limitations: [
      "Percentage change is not symmetric — a 50% increase followed by a 50% decrease results in a 25% net decrease",
      "Percentages can be misleading with small base numbers (e.g., going from 1 to 2 is a 100% increase)",
      "Compound percentage changes cannot be simply added together",
    ],
  },

  "loan-emi-calculator": {
    whatIs: "The Loan EMI Calculator computes your Equated Monthly Installment (EMI) — the fixed amount you pay each month to repay a loan. It shows you the complete breakdown of principal and interest components over the loan tenure, helping you plan your finances before taking any loan.",
    whatIsExtra: [
      "EMI stands for Equated Monthly Installment. Each EMI payment consists of two components: the principal repayment and the interest payment. In the early months, a larger portion of your EMI goes toward interest. As the loan matures, more of each payment goes toward reducing the principal — this is called amortization.",
      "Understanding your EMI before taking a loan is crucial. It helps you determine whether the monthly payment fits within your budget. Financial advisors typically recommend that your total EMI obligations should not exceed 40% of your monthly take-home salary.",
    ],
    howFormulaWorks: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P = principal loan amount, r = monthly interest rate (annual rate ÷ 12 ÷ 100), n = total number of monthly payments.",
    formulaBreakdown: [
      "P = Principal loan amount (the amount you borrow)",
      "r = Monthly interest rate = Annual rate ÷ 12 ÷ 100",
      "n = Loan tenure in months",
      "Total Interest Payable = (EMI × n) − P",
      "Total Amount Payable = EMI × n",
    ],
    howToUse: [
      "Enter the loan amount (principal) you wish to borrow",
      "Enter the annual interest rate offered by the lender",
      "Select the loan tenure in months or years",
      "Click Calculate to see your monthly EMI",
      "Review the amortization breakdown showing principal vs. interest split",
    ],
    exampleTitle: "Example: $100,000 loan at 8% for 5 years (60 months)",
    exampleContent: "Monthly EMI = $2,027.64 | Total Interest Paid = $21,658.40 | Total Amount Paid = $121,658.40 | Interest-to-Principal Ratio = 21.66%",
    tables: [
      {
        title: "EMI Comparison at Different Interest Rates ($100,000 for 5 Years)",
        headers: ["Interest Rate", "Monthly EMI", "Total Interest", "Total Payable"],
        rows: [
          ["5%", "$1,887.12", "$13,227.40", "$113,227.40"],
          ["7%", "$1,980.12", "$18,807.07", "$118,807.07"],
          ["8%", "$2,027.64", "$21,658.40", "$121,658.40"],
          ["10%", "$2,124.70", "$27,482.27", "$127,482.27"],
          ["12%", "$2,224.44", "$33,466.53", "$133,466.53"],
        ],
      },
      {
        title: "How Loan Tenure Affects EMI ($100,000 at 8%)",
        headers: ["Tenure", "Monthly EMI", "Total Interest", "Total Payable"],
        rows: [
          ["3 years", "$3,133.64", "$12,811.04", "$112,811.04"],
          ["5 years", "$2,027.64", "$21,658.40", "$121,658.40"],
          ["7 years", "$1,559.41", "$30,990.09", "$130,990.09"],
          ["10 years", "$1,213.28", "$45,593.20", "$145,593.20"],
          ["15 years", "$955.65", "$72,017.35", "$172,017.35"],
          ["20 years", "$836.44", "$100,745.60", "$200,745.60"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "How Amortization Works",
        content: "Loan amortization is the process of paying off a loan through regular monthly installments. In the early months, a larger portion of your EMI goes toward paying interest because the outstanding principal is higher. As you continue making payments and the principal decreases, more of each EMI goes toward repaying the principal. For a $100,000 loan at 8% for 20 years, your first payment splits roughly $667 to interest and $170 to principal. By month 120 (halfway), it shifts to roughly $443 interest and $393 principal. Your final payment is almost entirely principal.",
      },
      {
        title: "Fixed vs. Floating Interest Rates",
        content: "Fixed-rate loans keep the same interest rate throughout the tenure, making your EMI predictable and easy to budget. Floating-rate (variable) loans are linked to a benchmark rate and can change periodically. Floating rates often start lower than fixed rates but carry the risk of increasing over time. For long-tenure loans like mortgages, even a 1% rate difference can save or cost tens of thousands of dollars over the life of the loan.",
      },
      {
        title: "Prepayment and Foreclosure",
        content: "Making prepayments (extra payments beyond your EMI) can significantly reduce your total interest burden. Even one extra EMI payment per year can shorten a 30-year mortgage by several years. Some lenders charge prepayment penalties, typically 2–4% of the outstanding principal. Always check your loan terms before making prepayments. For floating-rate loans in many countries, prepayment penalties are not allowed by regulation.",
      },
    ],
    tips: [
      "Keep total EMI obligations below 40% of your monthly take-home salary",
      "A shorter tenure means higher EMIs but substantially lower total interest",
      "Even a 0.5% lower interest rate saves thousands over a long loan tenure",
      "Make part-prepayments when you have surplus cash to reduce interest burden",
      "Compare loan offers from multiple lenders — processing fees and rates vary significantly",
    ],
    limitations: [
      "EMI calculator assumes a fixed interest rate — floating rate EMIs may change periodically",
      "Does not include processing fees, insurance charges, or other loan-related costs",
      "Actual EMI may differ slightly due to rounding by the lending institution",
      "Does not account for moratorium periods or grace periods some lenders offer",
    ],
  },

  "mortgage-calculator": {
    whatIs: "The Mortgage Calculator estimates your monthly mortgage payment including principal, interest, property taxes, and homeowner's insurance. It helps you understand the true cost of buying a home and compare different loan scenarios before making one of the biggest financial decisions of your life.",
    whatIsExtra: [
      "A mortgage is a loan used to purchase real estate, where the property itself serves as collateral. Mortgages typically have terms of 15 or 30 years, and the interest rate can be fixed (stays the same) or adjustable (changes after an initial period). Your monthly mortgage payment is often referred to as PITI: Principal, Interest, Taxes, and Insurance.",
      "The 28/36 rule is a common guideline for how much house you can afford. Your monthly housing costs (mortgage + taxes + insurance) should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36% of gross income.",
    ],
    howFormulaWorks: "M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where M = monthly payment (principal + interest), P = loan principal, r = monthly interest rate, n = total number of payments.",
    formulaBreakdown: [
      "P = Home price − Down payment (your loan amount)",
      "r = Annual interest rate ÷ 12 ÷ 100",
      "n = Loan term in years × 12 (total monthly payments)",
      "Add monthly property tax, homeowner's insurance, and PMI if applicable",
      "Total monthly payment = P&I + Taxes + Insurance + PMI",
    ],
    howToUse: [
      "Enter the home purchase price",
      "Enter your down payment amount or percentage",
      "Enter the annual interest rate and loan term",
      "Optionally add property tax rate and insurance costs",
      "View your monthly payment breakdown and total cost over the loan",
    ],
    exampleTitle: "Example: $350,000 Home with 20% Down at 6.5% for 30 Years",
    exampleContent: "Loan amount: $280,000 | Monthly P&I: $1,770.09 | Monthly taxes (est.): $364.58 | Monthly insurance (est.): $145.83 | Total monthly: $2,280.50 | Total paid over 30 years: $637,232.40 (interest: $357,232.40)",
    tables: [
      {
        title: "Monthly Payment by Loan Amount (30-Year Fixed at 6.5%)",
        headers: ["Loan Amount", "Monthly P&I", "Total Interest (30 yr)", "Total Paid"],
        rows: [
          ["$150,000", "$948.10", "$191,316.36", "$341,316.36"],
          ["$200,000", "$1,264.14", "$255,088.98", "$455,088.98"],
          ["$250,000", "$1,580.17", "$318,861.00", "$568,861.00"],
          ["$300,000", "$1,896.20", "$382,633.47", "$682,633.47"],
          ["$400,000", "$2,528.27", "$510,178.22", "$910,178.22"],
          ["$500,000", "$3,160.34", "$637,722.97", "$1,137,722.97"],
        ],
      },
      {
        title: "15-Year vs. 30-Year Mortgage Comparison ($300,000 at 6.5%)",
        headers: ["Feature", "15-Year", "30-Year"],
        rows: [
          ["Monthly Payment", "$2,613.32", "$1,896.20"],
          ["Total Interest", "$170,397.07", "$382,633.47"],
          ["Total Paid", "$470,397.07", "$682,633.47"],
          ["Interest Savings", "$212,236.40 less", "—"],
          ["Higher Monthly Cost", "—", "$717.12 less per month"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Understanding Down Payments and PMI",
        content: "A down payment is the upfront cash you pay when buying a home. Conventional loans typically require 5–20% down. If you put less than 20% down, you'll likely need Private Mortgage Insurance (PMI), which costs 0.5–1.5% of the loan amount annually. PMI protects the lender if you default. Once you reach 20% equity in your home, you can request PMI removal. FHA loans require as little as 3.5% down but have their own mortgage insurance premiums. VA loans (for veterans) may require 0% down with no PMI.",
      },
      {
        title: "Fixed-Rate vs. Adjustable-Rate Mortgages (ARM)",
        content: "A fixed-rate mortgage locks in the same interest rate for the entire loan term, providing predictable payments. An adjustable-rate mortgage (ARM) starts with a lower introductory rate for a set period (typically 5, 7, or 10 years), then adjusts periodically based on market rates. A '5/1 ARM' means the rate is fixed for 5 years, then adjusts annually. ARMs can be beneficial if you plan to sell or refinance before the adjustment period, but they carry the risk of significantly higher payments if rates rise.",
      },
      {
        title: "Amortization and Equity Building",
        content: "With each mortgage payment, you build equity — the portion of the home you truly own. In the early years of a 30-year mortgage, only about 20–30% of each payment goes to principal. By year 15, roughly half goes to principal. The final years are almost entirely principal payments. You can build equity faster by making extra payments, choosing a shorter loan term, or making biweekly payments (26 half-payments per year = 13 full payments instead of 12).",
      },
    ],
    tips: [
      "Use the 28/36 rule: housing costs ≤ 28% of gross income, total debt ≤ 36%",
      "A 20% down payment avoids PMI and reduces your loan amount significantly",
      "Even 0.25% lower interest rate saves thousands over a 30-year mortgage",
      "Consider a 15-year mortgage if you can afford the higher payment — you'll save over 50% in total interest",
      "Get pre-approved before house hunting to know your exact budget",
      "Factor in closing costs (typically 2–5% of home price) when budgeting",
    ],
    limitations: [
      "Calculator provides estimates — actual payments depend on specific lender terms",
      "Property taxes and insurance costs vary by location and are estimates",
      "Does not include HOA fees, maintenance costs, or utility expenses",
      "ARM calculations show only the initial fixed-rate period payments",
    ],
  },

  "compound-interest-calculator": {
    whatIs: "The Compound Interest Calculator shows how your investments grow over time when interest earns interest. Unlike simple interest (calculated only on the original principal), compound interest is calculated on both the initial principal and the accumulated interest from previous periods — creating exponential growth often called 'the eighth wonder of the world.'",
    whatIsExtra: [
      "Albert Einstein reportedly called compound interest 'the most powerful force in the universe.' Whether or not he actually said it, the math is undeniable. Starting with $10,000 and earning 7% annually, you'd have $19,672 after 10 years, $38,697 after 20 years, and $76,123 after 30 years — without adding a single dollar. The longer your money compounds, the faster it grows.",
      "Compound interest works both ways. On savings and investments, it's your best friend. On debt (credit cards, loans), it's your worst enemy. A $5,000 credit card balance at 22% APR, with only minimum payments, can take over 20 years to pay off and cost more than $10,000 in interest.",
    ],
    howFormulaWorks: "A = P(1 + r/n)^(nt), where A = final amount, P = principal, r = annual interest rate (decimal), n = compounding frequency per year, t = time in years.",
    formulaBreakdown: [
      "P = Initial principal (starting amount)",
      "r = Annual interest rate as a decimal (e.g., 7% = 0.07)",
      "n = Number of times interest compounds per year (12 = monthly, 4 = quarterly, 1 = annually)",
      "t = Number of years",
      "Interest earned = A − P",
      "With regular contributions: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) ÷ (r/n)]",
    ],
    howToUse: [
      "Enter your initial investment (principal) amount",
      "Enter the annual interest rate",
      "Select the compounding frequency (daily, monthly, quarterly, or annually)",
      "Enter the investment time period in years",
      "Optionally add regular monthly or annual contributions",
      "View the growth chart and final amount",
    ],
    exampleTitle: "Example: $10,000 at 7% for 30 Years (Monthly Compounding)",
    exampleContent: "Final Amount = $81,164.97 | Interest Earned = $71,164.97 | Growth = 711.6% | If you add $200/month: Final Amount = $325,063.38",
    tables: [
      {
        title: "Growth of $10,000 at Different Rates (Compounded Monthly)",
        headers: ["Years", "5%", "7%", "8%", "10%", "12%"],
        rows: [
          ["5", "$12,834", "$14,176", "$14,898", "$16,453", "$18,167"],
          ["10", "$16,470", "$20,097", "$22,196", "$27,070", "$33,004"],
          ["15", "$21,137", "$28,502", "$33,069", "$44,539", "$59,958"],
          ["20", "$27,126", "$40,418", "$49,268", "$73,281", "$108,926"],
          ["25", "$34,813", "$57,305", "$73,402", "$120,569", "$197,885"],
          ["30", "$44,677", "$81,165", "$109,357", "$198,374", "$359,496"],
        ],
      },
      {
        title: "Impact of Compounding Frequency ($10,000 at 8% for 20 Years)",
        headers: ["Frequency", "Final Amount", "Total Interest"],
        rows: [
          ["Annually", "$46,609.57", "$36,609.57"],
          ["Quarterly", "$48,010.21", "$38,010.21"],
          ["Monthly", "$48,886.37", "$38,886.37"],
          ["Daily", "$49,530.32", "$39,530.32"],
          ["Continuously", "$49,530.32", "$39,530.32"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "The Rule of 72",
        content: "The Rule of 72 is a quick mental math shortcut to estimate how long it takes to double your money. Simply divide 72 by your annual interest rate. At 6%, your money doubles in approximately 12 years (72 ÷ 6 = 12). At 8%, it doubles in about 9 years. At 10%, roughly 7.2 years. At 12%, about 6 years. This rule is most accurate for rates between 6% and 10%.",
      },
      {
        title: "The Power of Starting Early",
        content: "Time is the most important factor in compound interest. Consider two investors: Alice starts investing $200/month at age 25 and stops at age 35 (10 years, $24,000 total invested). Bob starts investing $200/month at age 35 and continues until age 65 (30 years, $72,000 total invested). At 8% annual return, Alice ends up with approximately $509,000 at age 65, while Bob has approximately $300,000 — even though Bob invested three times as much money. Alice's 10-year head start beats Bob's extra $48,000 in contributions.",
      },
      {
        title: "Simple Interest vs. Compound Interest",
        content: "Simple interest is calculated only on the original principal: Interest = P × r × t. On $10,000 at 7% for 30 years, simple interest yields $21,000 in interest ($31,000 total). Compound interest on the same amount yields $71,165 in interest ($81,165 total) — more than 3 times as much. The difference becomes more dramatic with higher rates and longer time periods.",
      },
    ],
    tips: [
      "Start investing as early as possible — time is your greatest asset with compound interest",
      "Choose investments with more frequent compounding when possible",
      "Reinvest dividends and interest rather than withdrawing them",
      "Consistent small contributions add up enormously over decades",
      "Use the Rule of 72 to quickly estimate doubling time",
    ],
    limitations: [
      "Assumes a constant rate of return — real investment returns vary year to year",
      "Does not account for inflation, taxes on gains, or investment fees",
      "Past returns do not guarantee future performance",
      "Does not factor in the risk associated with different types of investments",
    ],
  },

  "calorie-calculator": {
    whatIs: "The Calorie Calculator estimates your daily caloric needs based on your age, sex, height, weight, and activity level. Knowing how many calories you need helps you create a plan for weight loss, weight gain, or maintaining your current weight.",
    whatIsExtra: [
      "A calorie is a unit of energy. Your body burns calories through three main processes: Basal Metabolic Rate (BMR) — the calories burned just to keep your body alive (60–70% of total), the Thermic Effect of Food (TEF) — energy used to digest food (about 10%), and physical activity (20–30%). Your Total Daily Energy Expenditure (TDEE) is the sum of all three.",
      "To lose weight, you need to consume fewer calories than your TDEE (caloric deficit). To gain weight, you need to consume more (caloric surplus). A deficit of about 500 calories per day leads to roughly 1 pound (0.45 kg) of weight loss per week, since 1 pound of body fat equals approximately 3,500 calories.",
    ],
    howFormulaWorks: "Uses the Mifflin-St Jeor equation: Men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161. Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5. TDEE = BMR × Activity Factor.",
    formulaBreakdown: [
      "Step 1: Calculate BMR using the Mifflin-St Jeor equation",
      "Step 2: Multiply BMR by your activity level multiplier",
      "Sedentary (little or no exercise): BMR × 1.2",
      "Lightly active (1–3 days/week): BMR × 1.375",
      "Moderately active (3–5 days/week): BMR × 1.55",
      "Very active (6–7 days/week): BMR × 1.725",
      "Extra active (very hard exercise + physical job): BMR × 1.9",
    ],
    howToUse: [
      "Enter your age, sex, weight, and height",
      "Select your typical activity level",
      "Click Calculate to see your daily calorie needs",
      "View calorie targets for weight loss, maintenance, and weight gain",
    ],
    exampleTitle: "Example: 30-Year-Old Male, 180 lbs, 5'10\", Moderately Active",
    exampleContent: "BMR = 1,815 calories/day | TDEE = 2,813 calories/day | To lose 1 lb/week: ~2,313 cal/day | To gain 1 lb/week: ~3,313 cal/day",
    tables: [
      {
        title: "Daily Calorie Needs by Activity Level (Average Adults)",
        headers: ["Activity Level", "Women (cal/day)", "Men (cal/day)"],
        rows: [
          ["Sedentary", "1,600 – 2,000", "2,000 – 2,400"],
          ["Moderately Active", "1,800 – 2,200", "2,200 – 2,800"],
          ["Very Active", "2,000 – 2,400", "2,400 – 3,200"],
        ],
      },
      {
        title: "Calorie Deficit Guide for Weight Loss",
        headers: ["Weekly Goal", "Daily Deficit", "Approx. Monthly Loss"],
        rows: [
          ["0.5 lb/week", "250 calories", "2 lbs (0.9 kg)"],
          ["1 lb/week", "500 calories", "4 lbs (1.8 kg)"],
          ["1.5 lbs/week", "750 calories", "6 lbs (2.7 kg)"],
          ["2 lbs/week", "1,000 calories", "8 lbs (3.6 kg)"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Macronutrient Breakdown",
        content: "Calories come from three macronutrients: carbohydrates (4 cal/gram), protein (4 cal/gram), and fat (9 cal/gram). Alcohol provides 7 cal/gram. A balanced diet typically consists of 45–65% carbohydrates, 10–35% protein, and 20–35% fat. For weight loss with muscle preservation, many nutritionists recommend higher protein intake (0.7–1.0 g per pound of body weight) while maintaining a moderate caloric deficit.",
      },
      {
        title: "Why Crash Diets Don't Work",
        content: "Extreme calorie restriction (below 1,200 cal/day for women, 1,500 for men) can backfire. Your body enters 'starvation mode,' slowing your metabolism to conserve energy. You lose muscle mass along with fat, making it harder to maintain weight loss. When you resume normal eating, your slower metabolism means you regain weight faster — often more than you lost. Sustainable weight loss comes from moderate caloric deficits combined with regular exercise.",
      },
    ],
    tips: [
      "Never go below 1,200 calories/day (women) or 1,500 calories/day (men) without medical supervision",
      "Aim for 1–2 pounds of weight loss per week for sustainable results",
      "Track your food intake for at least a week to understand your actual calorie consumption",
      "Protein-rich foods keep you fuller longer and help preserve muscle during weight loss",
      "Your calorie needs decrease as you lose weight — recalculate every 10–15 lbs lost",
    ],
    limitations: [
      "Calorie formulas provide estimates — individual metabolism varies by 5–15%",
      "Does not account for medical conditions affecting metabolism (thyroid disorders, etc.)",
      "Activity level is self-reported and often overestimated",
      "Muscle mass significantly affects calorie burn but isn't captured in basic formulas",
    ],
  },

  "scientific-calculator": {
    whatIs: "The Scientific Calculator is an advanced mathematical tool that handles complex calculations beyond basic arithmetic. It supports trigonometric functions, logarithms, exponents, roots, factorials, constants (π and e), and both degree and radian modes — everything you need for algebra, calculus, physics, and engineering problems.",
    whatIsExtra: [
      "Scientific calculators became essential tools in education and professional fields starting in the 1970s. Today, our free online version provides the same functionality as physical calculators costing $20–$100, with the convenience of being accessible from any device with a web browser.",
    ],
    howFormulaWorks: "Supports standard mathematical notation with operator precedence (PEMDAS/BODMAS). Trigonometric functions (sin, cos, tan and their inverses), logarithmic functions (log base 10, natural log ln), exponential functions (e^x, 10^x), power and root functions (x², x³, √x, ∛x, x^y), and factorial (n!).",
    howToUse: [
      "Enter numbers and operators using the on-screen buttons or keyboard",
      "Toggle between Degree and Radian mode for trigonometric calculations",
      "Use parentheses for complex expressions to control order of operations",
      "View calculation history to reference previous results",
      "Use the ANS button to use the previous result in a new calculation",
    ],
    exampleTitle: "Example Calculations",
    exampleContent: "sin(45°) = 0.7071 | log(1000) = 3 | ln(e²) = 2 | √(144) = 12 | 5! = 120 | 2^10 = 1024",
    tables: [
      {
        title: "Common Trigonometric Values",
        headers: ["Angle (°)", "sin", "cos", "tan"],
        rows: [
          ["0°", "0", "1", "0"],
          ["30°", "0.5", "0.866", "0.577"],
          ["45°", "0.707", "0.707", "1"],
          ["60°", "0.866", "0.5", "1.732"],
          ["90°", "1", "0", "undefined"],
        ],
      },
      {
        title: "Useful Mathematical Constants",
        headers: ["Constant", "Symbol", "Value"],
        rows: [
          ["Pi", "π", "3.14159265358979..."],
          ["Euler's Number", "e", "2.71828182845904..."],
          ["Golden Ratio", "φ", "1.61803398874989..."],
          ["Square Root of 2", "√2", "1.41421356237309..."],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Degrees vs. Radians",
        content: "Degrees and radians are two ways to measure angles. A full circle is 360° or 2π radians. To convert: radians = degrees × π/180, and degrees = radians × 180/π. Most math and physics courses use radians, while everyday applications use degrees. Always check which mode your calculator is set to before computing trigonometric functions — this is one of the most common sources of errors.",
      },
      {
        title: "Order of Operations (PEMDAS/BODMAS)",
        content: "Mathematical expressions are evaluated in a specific order: Parentheses/Brackets first, then Exponents/Orders, then Multiplication and Division (left to right), then Addition and Subtraction (left to right). For example, 2 + 3 × 4 = 14 (not 20), because multiplication is done before addition. When in doubt, use parentheses to make the order explicit.",
      },
    ],
    tips: [
      "Always check whether you're in Degree or Radian mode before trigonometric calculations",
      "Use parentheses generously to avoid order-of-operations errors",
      "The natural logarithm (ln) uses base e; the common logarithm (log) uses base 10",
      "Remember: sin²(x) + cos²(x) = 1 for any angle x",
    ],
    limitations: [
      "Floating-point arithmetic may produce tiny rounding errors (e.g., sin(π) might show as 1.2e-16 instead of exactly 0)",
      "Very large numbers or very small numbers may lose precision",
      "Does not support complex number arithmetic, matrices, or symbolic math",
    ],
  },

  "concrete-calculator": {
    whatIs: "The Concrete Calculator estimates the exact amount of concrete needed for your construction project — whether it's a slab, footing, column, wall, or steps. It calculates the volume in cubic yards or cubic meters and estimates the number of pre-mixed bags required, helping you avoid costly over-ordering or project-delaying shortages.",
    whatIsExtra: [
      "Concrete is the most widely used construction material in the world. Getting the quantity right is critical: ordering too little means a second delivery (with additional fees and potential cold joints), while ordering too much wastes money and creates disposal problems. Most suppliers recommend adding 5–10% extra to account for waste, spillage, and uneven surfaces.",
    ],
    howFormulaWorks: "Volume = Length × Width × Depth (for slabs). For cylinders: Volume = π × r² × h. Convert cubic feet to cubic yards by dividing by 27. Add 5–10% waste factor.",
    formulaBreakdown: [
      "Rectangular slab: Volume (cu ft) = Length (ft) × Width (ft) × Thickness (ft)",
      "Convert inches to feet: divide by 12 (e.g., 4 inches = 0.333 ft)",
      "Cubic yards = Cubic feet ÷ 27",
      "Cylinder/column: Volume = π × radius² × height",
      "Bags needed: Cubic yards ÷ bag yield (80-lb bag yields ~0.6 cu ft)",
    ],
    howToUse: [
      "Select the shape of your project (slab, column, footing, etc.)",
      "Enter the dimensions in feet, inches, or meters",
      "The calculator automatically converts and computes volume",
      "Add your desired waste factor (5–10% recommended)",
      "View total concrete volume and estimated bag count",
    ],
    exampleTitle: "Example: 10 ft × 12 ft Patio Slab, 4 Inches Thick",
    exampleContent: "Volume = 10 × 12 × 0.333 = 40 cu ft = 1.48 cubic yards | With 10% waste: 1.63 cubic yards | Bags needed: ~67 bags (80-lb) or ~45 bags (60-lb)",
    tables: [
      {
        title: "Concrete Coverage by Slab Thickness (per cubic yard)",
        headers: ["Thickness", "Area Covered per Cubic Yard"],
        rows: [
          ["4 inches", "81 sq ft"],
          ["5 inches", "65 sq ft"],
          ["6 inches", "54 sq ft"],
          ["8 inches", "40.5 sq ft"],
          ["10 inches", "32.4 sq ft"],
          ["12 inches (1 ft)", "27 sq ft"],
        ],
      },
      {
        title: "Pre-Mixed Concrete Bag Yields",
        headers: ["Bag Size", "Yield per Bag", "Bags per Cubic Yard"],
        rows: [
          ["40 lb (18 kg)", "0.011 cu yd (0.3 cu ft)", "91 bags"],
          ["50 lb (23 kg)", "0.014 cu yd (0.375 cu ft)", "72 bags"],
          ["60 lb (27 kg)", "0.017 cu yd (0.45 cu ft)", "60 bags"],
          ["80 lb (36 kg)", "0.022 cu yd (0.6 cu ft)", "45 bags"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Concrete Mix Ratios",
        content: "Standard concrete mix ratios determine the strength and application. A general-purpose mix (M15) uses a 1:2:4 ratio (1 part cement, 2 parts sand, 4 parts gravel). A stronger structural mix (M20) uses 1:1.5:3. High-strength concrete (M25) uses 1:1:2. For most residential projects like driveways, patios, and sidewalks, a standard 1:2:4 mix or 3000 PSI ready-mix concrete is sufficient. For structural elements like footings and foundation walls, use at least 3500 PSI.",
      },
      {
        title: "Ready-Mix vs. Bagged Concrete",
        content: "For projects requiring more than 1–2 cubic yards, ordering ready-mix concrete from a truck is more economical and practical. Ready-mix is delivered pre-mixed and can be poured directly, saving hours of manual mixing. Most ready-mix companies have a minimum order (typically 1 cubic yard) and charge extra for small loads. For smaller projects, pre-mixed bags are convenient but labor-intensive — mixing 45 bags for one cubic yard takes significant time and effort.",
      },
      {
        title: "Curing and Strength",
        content: "Concrete reaches about 70% of its final strength in 7 days and 99% in 28 days, assuming proper curing. Keep fresh concrete moist for at least 7 days by covering it with plastic, wet burlap, or using a curing compound. Temperature matters: concrete should be poured when temperatures are between 50°F and 90°F (10–32°C). In cold weather, use hot water in the mix and insulating blankets. In hot weather, use cold water and plan pours for early morning.",
      },
    ],
    tips: [
      "Always order 5–10% more concrete than calculated to account for waste and uneven ground",
      "For projects over 2 cubic yards, ready-mix delivery is usually more cost-effective than bags",
      "A 4-inch slab is standard for patios; use 6 inches for driveways supporting vehicle traffic",
      "Use wire mesh or rebar for slabs to prevent cracking",
      "Have enough labor on hand — once concrete arrives, you typically have 60–90 minutes to pour and finish",
    ],
    limitations: [
      "Calculations assume uniform thickness — real ground may be uneven",
      "Does not account for subgrade compaction or gravel base requirements",
      "Waste factor varies by project complexity and pouring conditions",
      "Concrete pricing varies significantly by region and delivery distance",
    ],
  },

  "gpa-calculator": {
    whatIs: "The GPA Calculator computes your Grade Point Average on the standard 4.0 scale used by most colleges and universities. Enter your courses, grades, and credit hours to calculate your semester GPA, cumulative GPA, or plan future semesters to reach your target GPA.",
    whatIsExtra: [
      "Your GPA (Grade Point Average) is one of the most important academic metrics. It's used for scholarship eligibility, graduate school admissions, academic honors (Dean's List, Cum Laude), academic probation thresholds, and even job applications. Understanding how GPA is calculated helps you strategize course selection and prioritize study time.",
    ],
    howFormulaWorks: "GPA = Σ(Grade Points × Credit Hours) ÷ Total Credit Hours. Each letter grade maps to a numeric value on the 4.0 scale.",
    formulaBreakdown: [
      "Step 1: Convert each letter grade to its point value",
      "Step 2: Multiply grade points by credit hours for each course (= quality points)",
      "Step 3: Sum all quality points",
      "Step 4: Divide by total credit hours",
    ],
    howToUse: [
      "Add each course with its name and number of credit hours",
      "Select the letter grade received for each course",
      "View your calculated semester GPA",
      "Add previous semester data for cumulative GPA",
    ],
    exampleTitle: "Example Semester: 4 Courses, 13 Credit Hours",
    exampleContent: "Calculus I (4 cr, A = 4.0): 16.0 pts | English Comp (3 cr, B+ = 3.3): 9.9 pts | Biology (3 cr, A- = 3.7): 11.1 pts | History (3 cr, B = 3.0): 9.0 pts | Total: 46.0 ÷ 13 = GPA 3.54",
    tables: [
      {
        title: "Standard 4.0 GPA Scale",
        headers: ["Letter Grade", "Grade Points", "Percentage Equivalent"],
        rows: [
          ["A+", "4.0", "97–100%"],
          ["A", "4.0", "93–96%"],
          ["A-", "3.7", "90–92%"],
          ["B+", "3.3", "87–89%"],
          ["B", "3.0", "83–86%"],
          ["B-", "2.7", "80–82%"],
          ["C+", "2.3", "77–79%"],
          ["C", "2.0", "73–76%"],
          ["C-", "1.7", "70–72%"],
          ["D+", "1.3", "67–69%"],
          ["D", "1.0", "63–66%"],
          ["F", "0.0", "Below 63%"],
        ],
      },
      {
        title: "Latin Honors GPA Requirements (Typical)",
        headers: ["Honor", "Typical GPA Requirement"],
        rows: [
          ["Summa Cum Laude", "3.9 – 4.0"],
          ["Magna Cum Laude", "3.7 – 3.89"],
          ["Cum Laude", "3.5 – 3.69"],
          ["Dean's List (per semester)", "3.5+"],
          ["Academic Probation", "Below 2.0"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Weighted vs. Unweighted GPA",
        content: "An unweighted GPA uses the standard 4.0 scale regardless of course difficulty. A weighted GPA gives extra points for honors, AP, or IB courses — typically on a 5.0 scale (AP/IB A = 5.0, honors A = 4.5). Colleges usually see both and understand the difference. A 3.5 unweighted GPA with challenging AP courses may be more impressive than a 4.0 with only regular courses.",
      },
      {
        title: "How to Raise Your GPA",
        content: "Raising your GPA becomes harder as you accumulate more credit hours. Early in college, each course has a big impact. With 30 credit hours completed, getting an A in a 3-credit course changes your GPA significantly. With 90 credit hours, the same A barely moves it. Focus on high-credit courses where an A will have the most impact. Consider retaking courses where you received a D or F, as many schools replace the old grade in GPA calculations.",
      },
    ],
    tips: [
      "Higher-credit courses affect your GPA more — prioritize studying for 4-credit classes",
      "An A in a 4-credit course has the same GPA impact as an A in four 1-credit courses",
      "Check if your school allows grade replacement for retaken courses",
      "A GPA above 3.0 is generally considered 'good,' above 3.5 is 'very good,' above 3.7 is 'excellent'",
    ],
    limitations: [
      "GPA scales vary by institution — some use +/- grades, others don't",
      "Pass/Fail courses typically don't affect GPA",
      "Transfer credits may not factor into your GPA at the new institution",
      "Does not account for weighted GPA systems (AP/IB/Honors)",
    ],
  },

  "roi-calculator": {
    whatIs: "The ROI (Return on Investment) Calculator measures the profitability of an investment relative to its cost. ROI is expressed as a percentage, making it easy to compare the efficiency of different investments regardless of their size. It's one of the most widely used financial metrics for evaluating business decisions, real estate purchases, stock investments, and marketing campaigns.",
    whatIsExtra: [
      "ROI is popular because of its simplicity and versatility. A positive ROI means the investment gained more than it cost; a negative ROI means it lost money. However, ROI alone doesn't tell the whole story — a 50% ROI over 10 years is very different from 50% over 1 year. That's why annualized ROI is important for comparing investments of different durations.",
    ],
    howFormulaWorks: "ROI = ((Gain from Investment − Cost of Investment) ÷ Cost of Investment) × 100. Annualized ROI = ((1 + ROI)^(1/years) − 1) × 100.",
    formulaBreakdown: [
      "Net Profit = Final Value − Initial Investment",
      "ROI (%) = (Net Profit ÷ Initial Investment) × 100",
      "Annualized ROI = ((Final Value ÷ Initial Value)^(1/years) − 1) × 100",
    ],
    howToUse: [
      "Enter the initial investment cost",
      "Enter the final value or total return",
      "Optionally enter the investment period in years",
      "View ROI percentage and annualized return",
    ],
    exampleTitle: "Example: $5,000 Investment Grows to $7,500 in 3 Years",
    exampleContent: "Net Profit = $2,500 | ROI = 50% | Annualized ROI = 14.47% per year",
    tables: [
      {
        title: "ROI Examples Across Investment Types",
        headers: ["Investment", "Typical Annual ROI", "Risk Level"],
        rows: [
          ["Savings Account", "0.5% – 5%", "Very Low"],
          ["Government Bonds", "2% – 5%", "Low"],
          ["Index Funds (S&P 500)", "7% – 10% (historical avg)", "Medium"],
          ["Real Estate", "8% – 12%", "Medium"],
          ["Individual Stocks", "-50% to 100%+", "High"],
          ["Small Business", "15% – 30%+", "High"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "ROI vs. Other Financial Metrics",
        content: "While ROI is simple and useful, other metrics provide additional insight. Net Present Value (NPV) accounts for the time value of money. Internal Rate of Return (IRR) shows the effective annual rate of return. Payback Period tells you how quickly you'll recoup your initial investment. For complex investments, consider using multiple metrics rather than ROI alone.",
      },
    ],
    tips: [
      "Always compare annualized ROI when investments have different time horizons",
      "Factor in all costs — fees, taxes, maintenance — for an accurate ROI",
      "Historical average stock market ROI is about 7–10% per year (S&P 500)",
      "High ROI often comes with high risk — diversification reduces overall risk",
    ],
    limitations: [
      "Does not account for the time value of money (a dollar today is worth more than a dollar in the future)",
      "Does not factor in risk — a 10% guaranteed return is very different from a 10% average with high volatility",
      "Can be misleading if all costs are not included in the calculation",
      "Does not account for opportunity cost (what else you could have done with the money)",
    ],
  },

  "markup-calculator": {
    whatIs: "The Markup Calculator helps businesses determine the selling price of products based on cost and desired profit margin. It calculates markup percentage, selling price, and profit amount — essential tools for retail pricing, wholesale calculations, and profit planning.",
    howFormulaWorks: "Selling Price = Cost × (1 + Markup% ÷ 100). Markup% = ((Selling Price − Cost) ÷ Cost) × 100.",
    howToUse: ["Enter the cost price", "Enter desired markup percentage", "View selling price and profit"],
    exampleTitle: "Product cost $40 with 60% markup",
    exampleContent: "Selling Price = $40 × 1.60 = $64 | Profit = $24 per unit",
    additionalSections: [
      {
        title: "Markup vs. Margin — Key Difference",
        content: "Markup and margin are often confused but are different calculations. Markup is based on cost: (Selling Price − Cost) ÷ Cost × 100. Margin is based on selling price: (Selling Price − Cost) ÷ Selling Price × 100. A product that costs $40 and sells for $64 has a 60% markup but a 37.5% margin. When someone says '50% margin,' they mean profit is 50% of the selling price. When they say '50% markup,' profit is 50% of the cost. This distinction is critical for pricing strategy.",
      },
    ],
    tables: [
      {
        title: "Markup vs. Margin Conversion",
        headers: ["Markup %", "Margin %", "Cost $50 → Selling Price"],
        rows: [
          ["25%", "20%", "$62.50"],
          ["33.3%", "25%", "$66.67"],
          ["50%", "33.3%", "$75.00"],
          ["75%", "42.9%", "$87.50"],
          ["100%", "50%", "$100.00"],
          ["150%", "60%", "$125.00"],
        ],
      },
    ],
    tips: [
      "Know the difference between markup and margin — they're not the same",
      "Industry-standard markups vary: groceries 5–15%, clothing 50–100%, restaurants 200–300%",
      "Factor in overhead costs (rent, utilities, labor) when setting markup, not just product cost",
    ],
    limitations: [
      "Does not account for overhead, operating costs, or market pricing pressure",
      "Optimal markup depends on industry, competition, and customer willingness to pay",
    ],
  },

  "break-even-calculator": {
    whatIs: "The Break-Even Calculator determines the exact point where your total revenue equals total costs — meaning zero profit and zero loss. It tells you how many units you need to sell or how much revenue you need to cover all fixed and variable expenses, helping you make informed business decisions.",
    howFormulaWorks: "Break-Even Units = Fixed Costs ÷ (Price per Unit − Variable Cost per Unit). Break-Even Revenue = Fixed Costs ÷ (1 − Variable Cost Ratio).",
    howToUse: ["Enter total fixed costs", "Enter selling price per unit", "Enter variable cost per unit", "View break-even quantity and revenue"],
    exampleTitle: "Fixed costs $10,000/month, price $50/unit, variable cost $30/unit",
    exampleContent: "Break-Even = $10,000 ÷ ($50 − $30) = 500 units | Revenue needed = 500 × $50 = $25,000/month",
    tables: [
      {
        title: "Break-Even Sensitivity Analysis",
        headers: ["Selling Price", "Variable Cost", "Contribution Margin", "Break-Even Units (at $10,000 fixed)"],
        rows: [
          ["$40", "$25", "$15", "667 units"],
          ["$50", "$30", "$20", "500 units"],
          ["$60", "$30", "$30", "334 units"],
          ["$75", "$35", "$40", "250 units"],
          ["$100", "$40", "$60", "167 units"],
        ],
      },
    ],
    tips: [
      "Lower your break-even point by reducing fixed costs or increasing the selling price",
      "Contribution margin (price − variable cost) is the key driver of break-even analysis",
      "Break-even analysis is essential before launching any new product or business",
    ],
    limitations: [
      "Assumes constant selling price and variable costs regardless of volume",
      "Does not account for changes in demand at different price points",
      "Fixed costs may change in reality as the business scales",
    ],
  },

  "cement-calculator": {
    whatIs: "The Cement Calculator estimates the quantity of cement, sand, and aggregate needed for your construction project based on concrete volume and mix ratio.",
    howFormulaWorks: "For a standard 1:2:4 mix ratio, cement bags = (Volume × 1.54) ÷ (sum of ratio × bag volume). Adjusts for different mix ratios and wastage.",
    howToUse: ["Enter the volume of concrete needed", "Select the mix ratio", "View cement bags, sand, and aggregate quantities"],
    exampleTitle: "1 cubic meter of M20 (1:1.5:3) concrete",
    exampleContent: "Cement = 8.22 bags (50kg) | Sand = 0.45 m³ | Aggregate = 0.89 m³",
  },

  "brick-calculator": {
    whatIs: "The Brick Calculator estimates the number of bricks needed for your wall or structure based on wall dimensions and brick size, including mortar joints.",
    howFormulaWorks: "Number of Bricks = Wall Area ÷ (Brick Length + Mortar) × (Brick Height + Mortar). Add 5–10% for wastage.",
    howToUse: ["Enter wall dimensions", "Enter brick size and mortar thickness", "View total bricks with wastage allowance"],
    exampleTitle: "10 ft × 8 ft wall with standard bricks",
    exampleContent: "Wall area = 80 sq ft ≈ 525 standard bricks (including 5% wastage)",
  },

  "tip-calculator": {
    whatIs: "The Tip Calculator helps you quickly figure out how much to tip at restaurants, bars, salons, and for other services. It calculates the tip amount per person and the total bill when splitting with a group, taking the guesswork out of tipping etiquette.",
    whatIsExtra: [
      "Tipping customs vary widely around the world. In the United States, tipping is expected and typically ranges from 15–20% of the pre-tax bill at restaurants. In many European countries, a service charge is often included in the bill. In Japan, tipping is generally not practiced and can even be considered rude. Understanding local customs helps avoid social awkwardness when dining out.",
    ],
    howFormulaWorks: "Tip Amount = Bill × (Tip Percentage ÷ 100). Total = Bill + Tip. Per Person = Total ÷ Number of People.",
    formulaBreakdown: [
      "Tip = Pre-tax bill amount × Tip %",
      "Total bill = Pre-tax amount + Tip + Tax",
      "Per person = Total ÷ Number of people splitting",
    ],
    howToUse: [
      "Enter your bill amount (before tax)",
      "Select or enter the tip percentage",
      "Enter the number of people splitting the bill",
      "View the tip amount, total, and per-person cost",
    ],
    exampleTitle: "Example: $85 Dinner Bill, 20% Tip, Split 4 Ways",
    exampleContent: "Tip = $85 × 20% = $17.00 | Total = $102.00 | Per person = $25.50",
    tables: [
      {
        title: "Standard Tipping Guide (US)",
        headers: ["Service", "Typical Tip", "Notes"],
        rows: [
          ["Restaurant (sit-down)", "15–20%", "Pre-tax bill; 20%+ for excellent service"],
          ["Buffet", "10%", "Less expected but still appreciated"],
          ["Takeout/Delivery", "10–15%", "15–20% for delivery in bad weather"],
          ["Bar/Bartender", "$1–2 per drink or 15–20%", "More for complex cocktails"],
          ["Hair Salon/Barber", "15–20%", "Of the total service cost"],
          ["Taxi/Rideshare", "15–20%", "More for help with luggage"],
          ["Hotel Housekeeping", "$2–5 per night", "Left daily, not just at checkout"],
          ["Valet Parking", "$2–5", "When car is returned"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Tipping on Pre-Tax vs. Post-Tax Amount",
        content: "Technically, tips should be calculated on the pre-tax bill amount, since sales tax goes to the government and doesn't reflect the service you received. However, many people tip on the post-tax total for simplicity. On a $100 meal with 8% tax, tipping 20% pre-tax gives $20, while tipping 20% post-tax gives $21.60. The difference is small, but over many meals it adds up.",
      },
      {
        title: "Quick Mental Math for Tipping",
        content: "To calculate 20% quickly: move the decimal point one place left (that's 10%), then double it. For a $47.50 bill: 10% = $4.75, doubled = $9.50. For 15%: find 10% and add half of that. 10% of $47.50 = $4.75, half = $2.38, total 15% tip = $7.13. For 25%: find 10%, multiply by 2.5, or just add 10% + 15%.",
      },
    ],
    tips: [
      "Tip on the pre-tax amount for accuracy, but post-tax is acceptable",
      "For large groups (6+), many restaurants add an automatic 18–20% gratuity",
      "If service was poor, speak to a manager rather than leaving no tip — servers often earn below minimum wage before tips",
      "Round up to the nearest dollar for simplicity when splitting bills",
    ],
    limitations: [
      "Tipping customs vary significantly by country and culture",
      "Does not account for automatic gratuity charges on large party bills",
      "Some establishments have no-tipping policies with higher menu prices instead",
    ],
  },

  "discount-calculator": {
    whatIs: "The Discount Calculator helps you determine the final price of an item after applying a percentage discount. It shows you exactly how much you save and what you actually pay, making it easy to evaluate deals during sales, promotions, and coupon offers.",
    whatIsExtra: [
      "Understanding discounts is essential for smart shopping. A '50% off' deal sounds great, but a '$20 off' coupon might save you more depending on the item's price. Stacking discounts (like 20% off + an additional 10% off) doesn't equal 30% off — it's actually 28% off the original price. This calculator helps you avoid common discount traps.",
    ],
    howFormulaWorks: "Discount Amount = Original Price × (Discount % ÷ 100). Final Price = Original Price − Discount Amount. For stacked discounts: Final = Price × (1 − D1%) × (1 − D2%).",
    formulaBreakdown: [
      "Single discount: Savings = Price × Discount% ÷ 100",
      "Final price = Original − Savings",
      "Stacked discounts: Apply each discount sequentially, not additively",
      "Example: 20% + 10% off $100 = $100 × 0.80 × 0.90 = $72 (not $70)",
    ],
    howToUse: [
      "Enter the original price of the item",
      "Enter the discount percentage",
      "View the discount amount and final price you'll pay",
      "Optionally add sales tax to see the true total",
    ],
    exampleTitle: "Example: $250 Item with 30% Discount + 8% Sales Tax",
    exampleContent: "Discount = $75.00 | Sale Price = $175.00 | Tax = $14.00 | Final Price = $189.00 | Total Savings = $61.00 (vs. full price + tax of $270)",
    tables: [
      {
        title: "Quick Discount Reference",
        headers: ["Original Price", "10% Off", "20% Off", "30% Off", "40% Off", "50% Off"],
        rows: [
          ["$25", "$22.50", "$20.00", "$17.50", "$15.00", "$12.50"],
          ["$50", "$45.00", "$40.00", "$35.00", "$30.00", "$25.00"],
          ["$100", "$90.00", "$80.00", "$70.00", "$60.00", "$50.00"],
          ["$200", "$180.00", "$160.00", "$140.00", "$120.00", "$100.00"],
          ["$500", "$450.00", "$400.00", "$350.00", "$300.00", "$250.00"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Stacked Discounts Explained",
        content: "When a store offers '20% off, plus an extra 15% off sale items,' the discounts are applied sequentially, not added together. On a $100 item: first discount = $100 × 0.80 = $80. Second discount = $80 × 0.85 = $68. Total discount = 32% (not 35%). The order doesn't matter mathematically — 20% then 15% gives the same result as 15% then 20%. But be aware: some stores advertise stacked discounts to make deals sound better than they are.",
      },
    ],
    tips: [
      "Always calculate the per-unit price when comparing 'buy one get one' vs. percentage-off deals",
      "Stacked discounts are not additive — 20% off + 10% off = 28% off, not 30%",
      "Compare the dollar savings, not just the percentage — 10% off a $500 item saves more than 50% off a $20 item",
      "Factor in sales tax when comparing online vs. in-store prices",
    ],
    limitations: [
      "Does not account for membership fees or minimum purchase requirements for certain discounts",
      "Cannot calculate BOGO (buy one get one) deals — use per-unit price comparison instead",
    ],
  },

  "simple-interest-calculator": {
    whatIs: "The Simple Interest Calculator computes interest earned or owed using the basic interest formula where interest is calculated only on the original principal amount. Unlike compound interest, simple interest does not earn interest on previously accumulated interest, making it easier to calculate and commonly used for short-term loans, auto loans, and some savings instruments.",
    whatIsExtra: [
      "Simple interest is most commonly used for short-term financial products. Auto loans, personal loans, and some bonds use simple interest. It's straightforward and transparent — you always know exactly how much interest you'll pay. This makes it easier to budget compared to compound interest, where the total interest can grow unexpectedly over long periods.",
    ],
    howFormulaWorks: "Simple Interest = P × r × t, where P = principal, r = annual interest rate (as decimal), t = time in years. Total Amount = P + Interest.",
    formulaBreakdown: [
      "I = P × r × t (Interest)",
      "A = P + I = P(1 + rt) (Total amount)",
      "For months: t = number of months ÷ 12",
      "For days: t = number of days ÷ 365",
    ],
    howToUse: [
      "Enter the principal amount",
      "Enter the annual interest rate",
      "Enter the time period (years, months, or days)",
      "View the interest earned and total amount",
    ],
    exampleTitle: "Example: $5,000 at 6% for 3 Years (Simple Interest)",
    exampleContent: "Interest = $5,000 × 0.06 × 3 = $900 | Total Amount = $5,900 | Compare: Compound interest would yield $5,955.08 ($55 more)",
    tables: [
      {
        title: "Simple vs. Compound Interest Comparison ($10,000 at 6%)",
        headers: ["Years", "Simple Interest", "Compound Interest", "Difference"],
        rows: [
          ["1", "$10,600", "$10,600", "$0"],
          ["5", "$13,000", "$13,382", "$382"],
          ["10", "$16,000", "$17,908", "$1,908"],
          ["20", "$22,000", "$32,071", "$10,071"],
          ["30", "$28,000", "$57,435", "$29,435"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Where Simple Interest Is Used",
        content: "Simple interest is used in auto loans, short-term personal loans, some certificates of deposit (CDs), Treasury bills and some bonds, and add-on interest loans. It's also used as a basic building block in financial education. Whenever a loan advertisement says 'flat rate' or 'add-on rate,' it's likely using simple interest calculation, which makes the effective APR higher than the stated rate.",
      },
    ],
    tips: [
      "Simple interest is always less than compound interest for periods longer than 1 year",
      "For very short periods (under 1 year), simple and compound interest are nearly identical",
      "A 'flat rate' loan using simple interest has a higher effective APR than the stated rate",
      "Use simple interest calculations to quickly estimate short-term loan costs",
    ],
    limitations: [
      "Not used for most real-world savings accounts or long-term investments (those use compound interest)",
      "Flat-rate simple interest can be misleading — the effective rate is higher since the principal decreases over time",
    ],
  },

  "interest-rate-calculator": {
    whatIs: "The Interest Rate Calculator helps you find the interest rate on a loan or investment when you know the principal, final amount, and time period. It's useful for comparing financial products, understanding the true cost of borrowing, or determining the actual return on an investment.",
    howFormulaWorks: "For simple interest: r = (A − P) ÷ (P × t). For compound interest: r = n × [(A/P)^(1/nt) − 1], where n is compounding frequency.",
    formulaBreakdown: [
      "Simple: Rate = (Total Interest ÷ Principal) ÷ Time in years",
      "Compound: Rate = n × [(Final/Principal)^(1/(n×t)) − 1]",
      "APR = Annual Percentage Rate (does not include compounding)",
      "APY = Annual Percentage Yield (includes compounding effect)",
    ],
    howToUse: [
      "Enter the principal (starting) amount",
      "Enter the final (ending) amount",
      "Enter the time period",
      "Select simple or compound interest",
      "View the calculated interest rate",
    ],
    exampleTitle: "Example: $10,000 Grew to $15,000 in 5 Years",
    exampleContent: "Simple rate = 10% per year | Compound rate (annual) = 8.45% per year | Compound rate (monthly) = 8.14% per year",
    tables: [
      {
        title: "APR vs. APY at Different Rates (Monthly Compounding)",
        headers: ["APR (Stated)", "APY (Effective)", "Difference"],
        rows: [
          ["3%", "3.04%", "0.04%"],
          ["5%", "5.12%", "0.12%"],
          ["8%", "8.30%", "0.30%"],
          ["12%", "12.68%", "0.68%"],
          ["18%", "19.56%", "1.56%"],
          ["24%", "26.82%", "2.82%"],
        ],
      },
    ],
    tips: [
      "APY is always higher than APR for the same rate (except with annual compounding where they're equal)",
      "Banks advertise APY for savings (higher number) and APR for loans (lower number) — both are technically correct but favor the bank",
      "When comparing loans, always compare APR; when comparing savings, compare APY",
    ],
    limitations: [
      "Assumes constant interest rate over the entire period",
      "Does not account for fees, points, or closing costs that affect effective rate",
    ],
  },

  "inflation-calculator": {
    whatIs: "The Inflation Calculator shows how the purchasing power of money changes over time. It helps you understand how much a dollar amount from the past would be worth today, or how much today's money will be worth in the future, based on historical or projected inflation rates.",
    whatIsExtra: [
      "Inflation is the gradual increase in prices over time, which erodes purchasing power. What cost $100 in 2000 would cost approximately $180 in 2024 due to inflation. The average US inflation rate has been about 3.2% per year historically. Understanding inflation is crucial for retirement planning, salary negotiations, and long-term financial decisions.",
    ],
    howFormulaWorks: "Future Value = Present Value × (1 + Inflation Rate)^Years. Purchasing Power = Present Value ÷ (1 + Inflation Rate)^Years.",
    formulaBreakdown: [
      "Nominal value adjusted for inflation: Adjusted = Value × (1 + rate)^years",
      "Purchasing power loss: Today's $1 = $1 ÷ (1 + rate)^years in future dollars",
      "Real return = Nominal return − Inflation rate (approximate)",
      "Rule of 72 for inflation: Prices double in 72 ÷ inflation rate years",
    ],
    howToUse: [
      "Enter a dollar amount",
      "Enter the starting and ending years, or the inflation rate",
      "View how the value has changed in real purchasing power",
    ],
    exampleTitle: "Example: $50,000 Salary, 3% Annual Inflation",
    exampleContent: "After 10 years: You'd need $67,196 to have the same purchasing power | After 20 years: $90,306 | After 30 years: $121,363",
    tables: [
      {
        title: "Impact of Inflation on $100,000 Over Time",
        headers: ["Years", "2% Inflation", "3% Inflation", "4% Inflation", "5% Inflation"],
        rows: [
          ["5", "$90,573", "$86,261", "$82,193", "$78,353"],
          ["10", "$82,035", "$74,409", "$67,556", "$61,391"],
          ["15", "$74,301", "$64,186", "$55,526", "$48,102"],
          ["20", "$67,297", "$55,368", "$45,639", "$37,689"],
          ["25", "$60,953", "$47,761", "$37,512", "$29,530"],
          ["30", "$55,207", "$41,199", "$30,832", "$23,138"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Why Inflation Matters for Retirement",
        content: "If you plan to retire in 25 years with $1 million, that amount will only have the purchasing power of about $478,000 in today's dollars (at 3% inflation). This is why financial planners emphasize investing in assets that outpace inflation. Holding cash in a savings account earning 1% while inflation runs at 3% means you're losing 2% of purchasing power every year. Stocks, real estate, and inflation-protected securities (TIPS) are common inflation hedges.",
      },
    ],
    tips: [
      "Your investments need to earn more than the inflation rate to grow in real terms",
      "Social Security payments are adjusted for inflation (COLA), but many pensions are not",
      "When negotiating salary, factor in inflation — a 2% raise during 3% inflation is actually a pay cut",
      "Use inflation-adjusted (real) returns when planning long-term financial goals",
    ],
    limitations: [
      "Historical inflation rates don't predict future inflation",
      "CPI (Consumer Price Index) may not reflect your personal inflation rate — healthcare and education often inflate faster",
      "Does not account for regional price differences",
    ],
  },

  "salary-calculator": {
    whatIs: "The Salary Calculator converts your pay between different time periods — annual, monthly, biweekly, weekly, daily, and hourly. It helps you compare job offers quoted in different pay frequencies and understand your true earnings across different timeframes.",
    howFormulaWorks: "Hourly = Annual ÷ (Hours/week × 52). Monthly = Annual ÷ 12. Biweekly = Annual ÷ 26. Weekly = Annual ÷ 52. Daily = Annual ÷ 260 (working days).",
    howToUse: [
      "Enter your salary or wage in any time period",
      "Specify hours per week and weeks per year if needed",
      "View your pay converted to all time periods",
    ],
    exampleTitle: "Example: $60,000 Annual Salary (40 hrs/week)",
    exampleContent: "Monthly = $5,000 | Biweekly = $2,307.69 | Weekly = $1,153.85 | Daily = $230.77 | Hourly = $28.85",
    tables: [
      {
        title: "Annual Salary to Hourly Rate Conversion (40-Hour Week)",
        headers: ["Annual Salary", "Monthly", "Biweekly", "Weekly", "Hourly"],
        rows: [
          ["$30,000", "$2,500", "$1,154", "$577", "$14.42"],
          ["$40,000", "$3,333", "$1,538", "$769", "$19.23"],
          ["$50,000", "$4,167", "$1,923", "$962", "$24.04"],
          ["$60,000", "$5,000", "$2,308", "$1,154", "$28.85"],
          ["$75,000", "$6,250", "$2,885", "$1,442", "$36.06"],
          ["$100,000", "$8,333", "$3,846", "$1,923", "$48.08"],
          ["$150,000", "$12,500", "$5,769", "$2,885", "$72.12"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Gross Pay vs. Net Pay (Take-Home)",
        content: "Your gross salary is the total amount before deductions. Net pay (take-home pay) is what you actually receive after federal income tax, state income tax, Social Security (6.2%), Medicare (1.45%), health insurance premiums, and retirement contributions (401k/IRA). Depending on your tax bracket and deductions, take-home pay is typically 65–80% of gross salary. A $60,000 salary might yield $45,000–$48,000 in take-home pay.",
      },
    ],
    tips: [
      "When comparing salaried vs. hourly positions, factor in benefits (healthcare, retirement matching, PTO)",
      "A salaried position at $50k/year with good benefits can be worth more than $60k/year without",
      "Biweekly pay means 26 paychecks per year, not 24 — two months per year have 3 paychecks",
      "Always negotiate based on total compensation, not just base salary",
    ],
    limitations: [
      "Does not calculate tax withholdings or net pay",
      "Does not account for overtime, bonuses, or commission",
      "Assumes consistent hours per week throughout the year",
    ],
  },

  "sales-tax-calculator": {
    whatIs: "The Sales Tax Calculator computes the total cost of a purchase including sales tax, or calculates the pre-tax price from a tax-inclusive total. Essential for budgeting purchases, comparing prices across states, and understanding the true cost of goods and services.",
    howFormulaWorks: "Tax Amount = Price × (Tax Rate ÷ 100). Total = Price + Tax. Pre-tax Price = Total ÷ (1 + Tax Rate ÷ 100).",
    howToUse: [
      "Enter the item price (before tax)",
      "Enter your local sales tax rate",
      "View the tax amount and total cost",
    ],
    exampleTitle: "Example: $599 Laptop with 8.25% Sales Tax",
    exampleContent: "Tax = $599 × 8.25% = $49.42 | Total = $648.42",
    tables: [
      {
        title: "US States with No Sales Tax",
        headers: ["State", "Sales Tax", "Notes"],
        rows: [
          ["Alaska", "0%", "Some local jurisdictions charge up to 7.5%"],
          ["Delaware", "0%", "No state or local sales tax"],
          ["Montana", "0%", "Some resort areas charge local taxes"],
          ["New Hampshire", "0%", "No state or local sales tax"],
          ["Oregon", "0%", "No state or local sales tax"],
        ],
      },
      {
        title: "Highest Combined State + Local Sales Tax Rates (2024)",
        headers: ["State", "State Rate", "Avg. Combined Rate"],
        rows: [
          ["Tennessee", "7%", "9.548%"],
          ["Louisiana", "4.45%", "9.550%"],
          ["Arkansas", "6.5%", "9.44%"],
          ["Washington", "6.5%", "9.29%"],
          ["Alabama", "4%", "9.24%"],
        ],
      },
    ],
    tips: [
      "Compare total cost (including tax) when shopping across state lines or online",
      "Many states exempt groceries, prescription medicines, and clothing from sales tax",
      "Online purchases often include sales tax based on your shipping address, not the seller's location",
    ],
    limitations: [
      "Tax rates change frequently — always verify current rates with your local tax authority",
      "Does not account for item-specific exemptions (food, medicine, clothing vary by state)",
    ],
  },

  "tax-calculator": {
    whatIs: "The Tax Calculator estimates your federal income tax liability based on your filing status, income, deductions, and credits. It helps you understand your effective tax rate, marginal tax rate, and estimated refund or amount owed.",
    whatIsExtra: [
      "The US uses a progressive tax system with seven tax brackets. This means only the income within each bracket is taxed at that bracket's rate — not your entire income. Someone in the '24% tax bracket' doesn't pay 24% on all their income; they pay 10% on the first portion, 12% on the next, 22% on the next, and only 24% on the amount above the previous bracket's threshold.",
    ],
    howFormulaWorks: "Taxable Income = Gross Income − Deductions. Tax is calculated progressively using marginal tax brackets. Effective Rate = Total Tax ÷ Gross Income × 100.",
    howToUse: [
      "Enter your gross annual income",
      "Select your filing status (Single, Married Filing Jointly, etc.)",
      "Enter deductions (standard or itemized)",
      "View your estimated tax, effective rate, and marginal rate",
    ],
    exampleTitle: "Example: $85,000 Income, Single, Standard Deduction (2024)",
    exampleContent: "Taxable Income = $85,000 − $14,600 = $70,400 | Federal Tax ≈ $11,428 | Effective Rate = 13.4% | Marginal Rate = 22%",
    tables: [
      {
        title: "2024 Federal Income Tax Brackets (Single Filers)",
        headers: ["Tax Rate", "Income Range", "Tax Owed"],
        rows: [
          ["10%", "$0 – $11,600", "10% of income"],
          ["12%", "$11,601 – $47,150", "$1,160 + 12% over $11,600"],
          ["22%", "$47,151 – $100,525", "$5,426 + 22% over $47,150"],
          ["24%", "$100,526 – $191,950", "$17,168.50 + 24% over $100,525"],
          ["32%", "$191,951 – $243,725", "$39,110.50 + 32% over $191,950"],
          ["35%", "$243,726 – $609,350", "$55,678.50 + 35% over $243,725"],
          ["37%", "Over $609,350", "$183,647.25 + 37% over $609,350"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Marginal vs. Effective Tax Rate",
        content: "Your marginal tax rate is the rate on your last dollar of income — it's the bracket you fall into. Your effective tax rate is your total tax divided by your total income, and it's always lower than your marginal rate due to the progressive bracket system. Someone earning $100,000 with a 22% marginal rate actually pays an effective rate of about 15–17%. Understanding this difference helps you make better decisions about additional income, deductions, and tax planning.",
      },
      {
        title: "Standard Deduction vs. Itemizing",
        content: "The standard deduction for 2024 is $14,600 for single filers, $29,200 for married filing jointly, and $21,900 for head of household. You should itemize only if your total deductible expenses (mortgage interest, state/local taxes up to $10,000, charitable contributions, medical expenses over 7.5% of AGI) exceed the standard deduction. About 87% of taxpayers take the standard deduction.",
      },
    ],
    tips: [
      "Contribute to a traditional 401(k) or IRA to reduce your taxable income",
      "Marginal rate is NOT the rate on your entire income — don't avoid earning more because of a higher bracket",
      "Review your W-4 withholding to avoid large refunds (you're giving the government an interest-free loan) or underpayment penalties",
      "HSA contributions are triple tax-advantaged: tax-deductible, grow tax-free, and withdrawals for medical expenses are tax-free",
    ],
    limitations: [
      "Estimates based on federal tax brackets only — state taxes are additional",
      "Does not calculate self-employment tax, capital gains tax, or AMT",
      "Tax law changes annually — always verify current brackets and deductions",
    ],
  },

  "auto-loan-calculator": {
    whatIs: "The Auto Loan Calculator estimates your monthly car payment, total interest cost, and the full price you'll pay for a vehicle loan. Compare different loan terms, interest rates, and down payments to find the most affordable option before visiting the dealership.",
    howFormulaWorks: "Monthly Payment = [P × r × (1+r)^n] ÷ [(1+r)^n − 1], where P = loan amount (price − down payment − trade-in), r = monthly rate, n = months.",
    howToUse: [
      "Enter the vehicle price",
      "Enter your down payment and/or trade-in value",
      "Enter the interest rate and loan term",
      "View monthly payment, total interest, and total cost",
    ],
    exampleTitle: "Example: $35,000 Car, $5,000 Down, 5.9% APR, 60 Months",
    exampleContent: "Loan Amount = $30,000 | Monthly Payment = $579.98 | Total Interest = $4,798.78 | Total Cost = $39,798.78",
    tables: [
      {
        title: "Monthly Payment by Loan Term ($30,000 at 5.9%)",
        headers: ["Term", "Monthly Payment", "Total Interest", "Total Paid"],
        rows: [
          ["36 months", "$912.10", "$2,835.66", "$32,835.66"],
          ["48 months", "$701.24", "$3,659.74", "$33,659.74"],
          ["60 months", "$579.98", "$4,798.78", "$34,798.78"],
          ["72 months", "$497.63", "$5,829.21", "$35,829.21"],
          ["84 months", "$439.21", "$6,893.44", "$36,893.44"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "New vs. Used Car Loan Rates",
        content: "Used car loans typically have higher interest rates than new car loans — often 1–3% higher. A new car at 5% APR vs. a used car at 7% APR can mean thousands more in interest over the loan term. However, used cars cost less upfront, so the total cost may still be lower. Consider the total cost of ownership including depreciation: a new car loses 20–30% of its value in the first year, while a 2–3 year old used car has already absorbed most of that depreciation.",
      },
    ],
    tips: [
      "Get pre-approved by your bank or credit union before visiting the dealer — you'll have more negotiating power",
      "A shorter loan term means higher payments but saves thousands in interest",
      "Keep your total car expenses (payment + insurance + fuel + maintenance) under 15–20% of take-home pay",
      "Avoid 72- or 84-month loans — you'll likely be 'underwater' (owing more than the car is worth) for years",
    ],
    limitations: [
      "Does not include insurance, registration, or maintenance costs",
      "Actual rate depends on your credit score, loan amount, and lender",
      "Does not factor in sales tax on the vehicle purchase",
    ],
  },

  "retirement-calculator": {
    whatIs: "The Retirement Calculator projects how much money you'll have at retirement based on your current savings, monthly contributions, expected returns, and years until retirement. It helps you determine if you're on track to meet your retirement goals and how much you need to save to close any gap.",
    whatIsExtra: [
      "The most common retirement guideline is the '4% rule' — you can safely withdraw 4% of your portfolio in the first year of retirement and adjust for inflation each year, with a high probability your money will last 30 years. This means you need roughly 25 times your annual retirement expenses saved. If you need $60,000/year in retirement, your target is $1.5 million.",
    ],
    howFormulaWorks: "Future Value = PV × (1+r)^n + PMT × [((1+r)^n − 1) ÷ r], where PV = current savings, PMT = monthly contribution, r = monthly return, n = months until retirement.",
    howToUse: [
      "Enter your current age and desired retirement age",
      "Enter your current retirement savings",
      "Enter your monthly contribution",
      "Enter the expected annual rate of return",
      "View your projected retirement savings and whether you're on track",
    ],
    exampleTitle: "Example: Age 30, $20,000 Saved, $500/month, 7% Return, Retire at 65",
    exampleContent: "Current savings grow to: $213,191 | Monthly contributions grow to: $876,254 | Total at 65: $1,089,445 | Can support ~$43,578/year withdrawals (4% rule)",
    tables: [
      {
        title: "Monthly Savings Needed to Reach $1 Million by Age 65",
        headers: ["Starting Age", "Monthly Savings (7% Return)", "Total Contributed", "Interest Earned"],
        rows: [
          ["25", "$381", "$182,880", "$817,120"],
          ["30", "$555", "$233,100", "$766,900"],
          ["35", "$820", "$295,200", "$704,800"],
          ["40", "$1,234", "$370,200", "$629,800"],
          ["45", "$1,920", "$460,800", "$539,200"],
          ["50", "$3,155", "$567,900", "$432,100"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "The Power of Employer Matching",
        content: "If your employer offers a 401(k) match (e.g., matching 50% of your contributions up to 6% of salary), always contribute at least enough to get the full match — it's essentially free money with a 50% instant return. On a $60,000 salary with a 50% match up to 6%: you contribute $3,600/year, employer adds $1,800, totaling $5,400/year. Over 30 years at 7% return, that employer match alone grows to approximately $170,000.",
      },
      {
        title: "The 4% Rule and Safe Withdrawal Rates",
        content: "The 4% rule, derived from the 'Trinity Study,' suggests that withdrawing 4% of your portfolio in the first year of retirement (then adjusting for inflation each year) has historically provided a 95%+ success rate over 30-year periods. For a $1 million portfolio, that's $40,000 in year one. Some financial planners recommend 3.5% for more conservative planning, while others argue that flexible spending allows for 4.5–5%. Your personal withdrawal rate depends on your investment allocation, retirement length, and other income sources like Social Security.",
      },
    ],
    tips: [
      "Start as early as possible — someone saving $200/month from age 25 accumulates more than someone saving $400/month from age 35",
      "Always contribute enough to your 401(k) to get the full employer match",
      "Consider Roth accounts for tax-free growth if you expect to be in a higher tax bracket in retirement",
      "Plan for healthcare costs — the average retired couple needs approximately $315,000 for lifetime healthcare expenses",
    ],
    limitations: [
      "Assumes a constant rate of return — real returns vary significantly year to year",
      "Does not account for inflation's impact on purchasing power",
      "Does not include Social Security or pension income",
      "Tax treatment differs between traditional and Roth accounts",
    ],
  },

  "investment-calculator": {
    whatIs: "The Investment Calculator projects the future value of your investments based on initial deposit, regular contributions, expected rate of return, and investment period. It helps you visualize how consistent investing builds wealth over time through the power of compounding.",
    howFormulaWorks: "FV = PV × (1+r)^n + PMT × [((1+r)^n − 1) ÷ r], where FV = future value, PV = initial investment, PMT = periodic contribution, r = periodic rate, n = number of periods.",
    howToUse: [
      "Enter your initial investment amount",
      "Enter regular contribution amount and frequency",
      "Enter the expected annual return rate",
      "Enter the investment time horizon",
      "View projected growth with detailed breakdown",
    ],
    exampleTitle: "Example: $5,000 Initial + $300/month for 20 Years at 8%",
    exampleContent: "Initial grows to: $23,305 | Contributions grow to: $176,496 | Total: $199,801 | Total invested: $77,000 | Growth: $122,801",
    tables: [
      {
        title: "Growth of $10,000 with $500/month Contributions at 7%",
        headers: ["Years", "Total Contributed", "Portfolio Value", "Interest Earned"],
        rows: [
          ["5", "$40,000", "$46,066", "$6,066"],
          ["10", "$70,000", "$100,780", "$30,780"],
          ["15", "$100,000", "$181,013", "$81,013"],
          ["20", "$130,000", "$296,342", "$166,342"],
          ["25", "$160,000", "$460,635", "$300,635"],
          ["30", "$190,000", "$694,693", "$504,693"],
        ],
      },
    ],
    tips: [
      "Dollar-cost averaging (investing a fixed amount regularly) reduces the impact of market volatility",
      "Reinvest dividends to maximize compound growth",
      "Low-cost index funds historically outperform most actively managed funds after fees",
      "A 1% annual fee difference can cost you hundreds of thousands over a 30-year period",
    ],
    limitations: [
      "Assumes constant rate of return — actual markets are volatile",
      "Does not account for taxes on gains, dividends, or withdrawals",
      "Does not factor in investment fees or expense ratios",
      "Past performance does not guarantee future results",
    ],
  },

  "amortization-calculator": {
    whatIs: "The Amortization Calculator generates a complete payment schedule showing exactly how each monthly payment is split between principal and interest over the life of your loan. It reveals how loan balances decrease over time and helps you understand the true cost of borrowing.",
    whatIsExtra: [
      "Amortization literally means 'to kill' (from the Latin 'mort' = death) — it describes the gradual death of a debt. An amortization schedule is essential for understanding how front-loaded interest payments work: in a typical 30-year mortgage, you pay more interest than principal for roughly the first 20 years. This is why extra payments early in a loan have an outsized impact on total interest savings.",
    ],
    howFormulaWorks: "Monthly Payment = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. Interest portion = Remaining Balance × Monthly Rate. Principal portion = Payment − Interest.",
    howToUse: [
      "Enter the loan amount, interest rate, and term",
      "View the monthly payment amount",
      "Scroll through the full amortization schedule",
      "See the running balance, interest paid, and principal paid for each payment",
    ],
    exampleTitle: "Example: $200,000 Mortgage at 6% for 30 Years",
    exampleContent: "Monthly Payment = $1,199.10 | Year 1: $11,879 interest, $2,510 principal | Year 15: $8,260 interest, $6,129 principal | Year 30: $886 interest, $13,303 principal | Total Interest = $231,677",
    tables: [
      {
        title: "Amortization Breakdown by Year ($200,000 at 6%, 30 Years)",
        headers: ["Year", "Annual Interest", "Annual Principal", "Remaining Balance"],
        rows: [
          ["1", "$11,879", "$2,510", "$197,490"],
          ["5", "$11,422", "$2,967", "$188,404"],
          ["10", "$10,626", "$3,763", "$174,065"],
          ["15", "$9,399", "$4,990", "$153,093"],
          ["20", "$7,580", "$6,809", "$122,207"],
          ["25", "$4,821", "$9,568", "$76,267"],
          ["30", "$886", "$13,303", "$0"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "The Impact of Extra Payments",
        content: "Making one extra payment per year on a 30-year mortgage can shorten your loan by 4–5 years and save tens of thousands in interest. On a $200,000 mortgage at 6%, paying an extra $100/month saves $43,000 in interest and pays off the loan 5 years early. Even rounding up your payment to the nearest $50 makes a meaningful difference over time. The key is that extra payments go entirely toward principal, reducing the balance that accrues interest.",
      },
    ],
    tips: [
      "Extra payments early in the loan save the most interest — each dollar of principal paid early prevents years of interest",
      "Biweekly payments (half your monthly payment every 2 weeks) result in 13 full payments per year instead of 12",
      "Before making extra payments, check that your lender applies them to principal and doesn't charge prepayment penalties",
      "Use the amortization schedule to set milestones — watching your principal portion grow can be motivating",
    ],
    limitations: [
      "Assumes fixed rate — adjustable rate mortgages will have changing payment amounts",
      "Does not include escrow payments for taxes and insurance",
      "Rounding can cause the final payment to differ slightly from the regular payment",
    ],
  },

  "bmr-calculator": {
    whatIs: "The BMR (Basal Metabolic Rate) Calculator estimates the number of calories your body burns at complete rest — just to maintain basic life functions like breathing, circulation, cell production, and temperature regulation. BMR accounts for 60–70% of your total daily calorie expenditure.",
    whatIsExtra: [
      "Your BMR is the minimum energy your body needs to survive if you did absolutely nothing all day — not even eating or thinking. It's influenced by age, sex, height, weight, body composition, and genetics. BMR decreases with age (about 1–2% per decade after age 20) and is generally higher in men due to greater muscle mass. Understanding your BMR is the foundation for any weight management plan.",
    ],
    howFormulaWorks: "Mifflin-St Jeor (most accurate): Men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 5. Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161.",
    formulaBreakdown: [
      "Mifflin-St Jeor: Considered the most accurate for most people",
      "Harris-Benedict (original): Men = 66.5 + 13.75×wt + 5.003×ht − 6.75×age",
      "Harris-Benedict (revised): Men = 88.362 + 13.397×wt + 4.799×ht − 5.677×age",
      "Katch-McArdle: BMR = 370 + 21.6 × Lean Body Mass (kg) — requires body fat % input",
    ],
    howToUse: [
      "Enter your age, sex, weight, and height",
      "View your estimated BMR in calories per day",
      "Multiply by your activity factor to get TDEE (Total Daily Energy Expenditure)",
    ],
    exampleTitle: "Example: 35-Year-Old Male, 80 kg, 180 cm",
    exampleContent: "BMR = 10(80) + 6.25(180) − 5(35) − 5 = 800 + 1,125 − 175 − 5 = 1,745 calories/day | TDEE (moderately active) = 1,745 × 1.55 = 2,705 cal/day",
    tables: [
      {
        title: "Average BMR by Age and Sex",
        headers: ["Age", "Average Male BMR", "Average Female BMR"],
        rows: [
          ["20–29", "1,750 – 1,900 cal", "1,400 – 1,550 cal"],
          ["30–39", "1,650 – 1,800 cal", "1,350 – 1,500 cal"],
          ["40–49", "1,550 – 1,700 cal", "1,300 – 1,450 cal"],
          ["50–59", "1,450 – 1,600 cal", "1,250 – 1,400 cal"],
          ["60+", "1,350 – 1,500 cal", "1,200 – 1,350 cal"],
        ],
      },
      {
        title: "Activity Multipliers for TDEE",
        headers: ["Activity Level", "Multiplier", "Description"],
        rows: [
          ["Sedentary", "1.2", "Desk job, little or no exercise"],
          ["Lightly Active", "1.375", "Light exercise 1–3 days/week"],
          ["Moderately Active", "1.55", "Moderate exercise 3–5 days/week"],
          ["Very Active", "1.725", "Hard exercise 6–7 days/week"],
          ["Extremely Active", "1.9", "Very hard exercise + physical job"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "How to Increase Your BMR",
        content: "Building lean muscle mass is the most effective way to permanently increase your BMR. Each pound of muscle burns approximately 6–7 calories per day at rest, compared to 2–3 calories for fat. Strength training 2–3 times per week can add several pounds of muscle over a year. Other factors that temporarily boost metabolic rate include eating protein (thermic effect of food is highest for protein at 20–30%), drinking cold water, getting adequate sleep, and staying hydrated.",
      },
    ],
    tips: [
      "Use BMR as a baseline — never eat below your BMR for extended periods",
      "Muscle mass is the biggest controllable factor affecting BMR — strength training helps",
      "BMR decreases with age; adjust your calorie intake accordingly",
      "The Mifflin-St Jeor equation is considered the most accurate for most people by the Academy of Nutrition and Dietetics",
    ],
    limitations: [
      "All BMR formulas are estimates — individual variation can be 5–15%",
      "Does not account for body composition unless using Katch-McArdle formula",
      "Metabolic conditions (hypothyroidism, etc.) can significantly affect actual BMR",
      "Extreme dieting can lower BMR through metabolic adaptation",
    ],
  },

  "body-fat-calculator": {
    whatIs: "The Body Fat Calculator estimates your body fat percentage using body measurements. Unlike BMI, body fat percentage distinguishes between fat mass and lean mass (muscle, bone, organs), providing a more accurate picture of body composition and health.",
    whatIsExtra: [
      "Body fat is essential for normal body functions — it cushions organs, insulates the body, stores energy, and produces hormones. However, excess body fat increases health risks. Essential fat is 2–5% for men and 10–13% for women. Athletes typically carry 6–13% (men) or 14–20% (women), while a healthy range for the general population is 14–24% (men) or 21–31% (women).",
    ],
    howFormulaWorks: "US Navy Method (Men): BF% = 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76. Women: BF% = 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387.",
    howToUse: [
      "Select your sex",
      "Enter your height, waist, neck, and hip (women) circumferences",
      "Click Calculate to see your estimated body fat percentage",
      "Review the body fat category chart",
    ],
    exampleTitle: "Example: Male, 5'10\", Waist 34\", Neck 15.5\"",
    exampleContent: "Body Fat ≈ 17.8% → Fitness category | Lean Mass ≈ 148 lbs | Fat Mass ≈ 32 lbs",
    tables: [
      {
        title: "Body Fat Percentage Categories",
        headers: ["Category", "Men", "Women"],
        rows: [
          ["Essential Fat", "2–5%", "10–13%"],
          ["Athletes", "6–13%", "14–20%"],
          ["Fitness", "14–17%", "21–24%"],
          ["Average", "18–24%", "25–31%"],
          ["Obese", "25%+", "32%+"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Body Fat Measurement Methods Compared",
        content: "There are several ways to measure body fat, each with different accuracy levels. DEXA scan (±1.5% error) is the gold standard but expensive ($75–150). Hydrostatic weighing (±1.5%) is highly accurate but inconvenient. Skinfold calipers (±3.5%) are affordable and widely available. Bioelectrical impedance (BIA) scales (±4–5%) are convenient but affected by hydration. The US Navy tape method (±3–4%) used in this calculator requires only a tape measure, making it accessible to everyone.",
      },
    ],
    tips: [
      "Measure circumferences at the same time of day for consistency",
      "Body fat percentage is more meaningful than weight — you can gain muscle and lose fat at the same weight",
      "Women naturally carry more essential fat than men for reproductive health",
      "Losing 1% body fat is approximately equivalent to losing 1.5–2 lbs of pure fat (depending on body weight)",
    ],
    limitations: [
      "The Navy method is an estimate — actual body fat can differ by 3–4%",
      "Measurement accuracy depends on consistent tape placement",
      "Not as accurate for very lean or very obese individuals",
      "Does not indicate where fat is distributed (visceral vs. subcutaneous)",
    ],
  },

  "ideal-weight-calculator": {
    whatIs: "The Ideal Weight Calculator estimates your healthy weight range based on your height, age, and sex using multiple established medical formulas. It provides a target range rather than a single number, recognizing that healthy weight varies based on body frame, muscle mass, and individual factors.",
    howFormulaWorks: "Multiple formulas: Devine (1974): Men = 50 + 2.3 × (height in inches − 60). Women = 45.5 + 2.3 × (height in inches − 60). Also includes Robinson, Miller, and Hamwi formulas.",
    howToUse: [
      "Enter your height and sex",
      "View ideal weight estimates from multiple formulas",
      "Compare the range to find a healthy target",
    ],
    exampleTitle: "Example: Male, 5'10\" (70 inches)",
    exampleContent: "Devine: 166.5 lbs | Robinson: 167 lbs | Miller: 160 lbs | Hamwi: 166 lbs | Healthy BMI Range: 129–174 lbs",
    tables: [
      {
        title: "Ideal Weight by Height (Average of Formulas)",
        headers: ["Height", "Men (lbs)", "Women (lbs)"],
        rows: [
          ["5'2\" (157 cm)", "131–141", "115–125"],
          ["5'4\" (163 cm)", "140–150", "122–132"],
          ["5'6\" (168 cm)", "149–160", "130–140"],
          ["5'8\" (173 cm)", "158–170", "138–148"],
          ["5'10\" (178 cm)", "166–179", "145–156"],
          ["6'0\" (183 cm)", "175–189", "153–164"],
          ["6'2\" (188 cm)", "184–199", "160–171"],
        ],
      },
    ],
    tips: [
      "Ideal weight formulas are guidelines, not strict rules — body composition matters more than the number on the scale",
      "A muscular person may weigh more than the 'ideal' and still be very healthy",
      "Focus on body fat percentage and waist circumference rather than weight alone",
      "Consult a healthcare provider for personalized weight recommendations",
    ],
    limitations: [
      "Formulas were developed decades ago on limited populations",
      "Does not account for muscle mass, body frame, or ethnicity",
      "Not applicable to children, pregnant women, or elderly individuals",
    ],
  },

  "age-calculator": {
    whatIs: "The Age Calculator determines your exact age in years, months, weeks, days, hours, and minutes from your date of birth. It can also calculate the time between any two dates, making it useful for age verification, milestone tracking, and date arithmetic.",
    howFormulaWorks: "Exact Age = Current Date − Birth Date, calculated accounting for leap years, varying month lengths, and timezone differences.",
    howToUse: [
      "Enter your date of birth",
      "Optionally enter a target date (defaults to today)",
      "View your exact age broken down into multiple units",
    ],
    exampleTitle: "Example: Born January 15, 1990",
    exampleContent: "Age: 36 years, 1 month, 27 days | Total: 434 months | 1,887 weeks | 13,209 days | 317,016 hours",
    tables: [
      {
        title: "Age Milestones in Different Units",
        headers: ["Milestone", "Months", "Weeks", "Days", "Hours"],
        rows: [
          ["1 year", "12", "52.2", "365", "8,760"],
          ["18 years", "216", "939", "6,574", "157,766"],
          ["30 years", "360", "1,565", "10,957", "262,968"],
          ["50 years", "600", "2,609", "18,262", "438,291"],
          ["65 years", "780", "3,391", "23,741", "569,778"],
          ["80 years", "960", "4,174", "29,220", "701,265"],
        ],
      },
    ],
    tips: [
      "This calculator accounts for leap years (every 4 years, except centuries not divisible by 400)",
      "Your '10,000th day' alive is around age 27 years and 5 months — a fun milestone to celebrate",
      "The Korean age system adds 1 year at birth and another on New Year's Day, not your birthday",
    ],
    limitations: [
      "Based on the Gregorian calendar — other calendar systems will give different results",
      "Does not account for timezone differences when calculating to the hour",
    ],
  },

  "fraction-calculator": {
    whatIs: "The Fraction Calculator performs arithmetic operations with fractions — addition, subtraction, multiplication, and division. It also simplifies fractions to their lowest terms and converts between fractions, decimals, and mixed numbers.",
    howFormulaWorks: "Addition: a/b + c/d = (ad + bc) / bd. Subtraction: a/b − c/d = (ad − bc) / bd. Multiplication: a/b × c/d = ac / bd. Division: a/b ÷ c/d = ad / bc.",
    formulaBreakdown: [
      "Finding LCD (Least Common Denominator): LCM of the two denominators",
      "Simplifying: Divide both numerator and denominator by their GCD",
      "Mixed to improper: whole × denominator + numerator, over denominator",
      "Improper to mixed: Divide numerator by denominator; remainder is new numerator",
    ],
    howToUse: [
      "Enter the first fraction (numerator and denominator)",
      "Select the operation (+, −, ×, ÷)",
      "Enter the second fraction",
      "View the result in simplified form, as a decimal, and as a mixed number",
    ],
    exampleTitle: "Example: 3/4 + 2/3",
    exampleContent: "LCD = 12 | 3/4 = 9/12 | 2/3 = 8/12 | Sum = 17/12 = 1 5/12 ≈ 1.4167",
    tables: [
      {
        title: "Common Fraction to Decimal Conversions",
        headers: ["Fraction", "Decimal", "Percentage"],
        rows: [
          ["1/8", "0.125", "12.5%"],
          ["1/6", "0.1667", "16.67%"],
          ["1/4", "0.25", "25%"],
          ["1/3", "0.3333", "33.33%"],
          ["3/8", "0.375", "37.5%"],
          ["1/2", "0.5", "50%"],
          ["5/8", "0.625", "62.5%"],
          ["2/3", "0.6667", "66.67%"],
          ["3/4", "0.75", "75%"],
          ["7/8", "0.875", "87.5%"],
        ],
      },
    ],
    tips: [
      "To divide fractions, flip the second fraction and multiply ('keep, change, flip')",
      "Always simplify your answer by dividing by the GCD of the numerator and denominator",
      "When adding fractions with different denominators, find the LCD first",
      "Any whole number can be written as a fraction with 1 as the denominator (e.g., 5 = 5/1)",
    ],
    limitations: [
      "Some fractions produce repeating decimals (1/3 = 0.333...) that cannot be expressed exactly in decimal form",
      "Very large numerators or denominators may lose precision in decimal conversion",
    ],
  },

  "square-footage-calculator": {
    whatIs: "The Square Footage Calculator measures the area of a space in square feet — essential for real estate, flooring, painting, landscaping, and construction projects. It supports rectangular, triangular, circular, and irregular shapes, and converts between square feet, square meters, square yards, and acres.",
    howFormulaWorks: "Rectangle: Area = Length × Width. Triangle: Area = ½ × Base × Height. Circle: Area = π × r². Irregular shapes: Break into rectangles and triangles, calculate each, and sum.",
    howToUse: [
      "Select the shape of the area you're measuring",
      "Enter the dimensions in feet, inches, or meters",
      "View the area in square feet and other units",
      "For irregular spaces, break into multiple shapes and add them together",
    ],
    exampleTitle: "Example: Room 14 ft × 12 ft with 3 ft × 4 ft Closet",
    exampleContent: "Main room = 168 sq ft | Closet = 12 sq ft | Total = 180 sq ft = 20 sq yards = 16.72 sq meters",
    tables: [
      {
        title: "Area Unit Conversions",
        headers: ["From", "To", "Multiply By"],
        rows: [
          ["Square feet", "Square meters", "0.0929"],
          ["Square feet", "Square yards", "0.1111"],
          ["Square feet", "Acres", "0.0000229568"],
          ["Square meters", "Square feet", "10.764"],
          ["Acres", "Square feet", "43,560"],
          ["Hectares", "Square feet", "107,639"],
        ],
      },
      {
        title: "Material Coverage Estimates",
        headers: ["Material", "Coverage per Unit", "For 200 sq ft Room"],
        rows: [
          ["Paint", "350–400 sq ft/gallon", "~1 gallon (1 coat)"],
          ["Hardwood Flooring", "20 sq ft/box (typical)", "10–11 boxes (+10% waste)"],
          ["Carpet", "12 ft wide rolls", "~17 linear feet"],
          ["Tile (12×12\")", "1 sq ft/tile", "220 tiles (+10% waste)"],
          ["Laminate", "20–25 sq ft/box", "9–10 boxes (+10% waste)"],
        ],
      },
    ],
    tips: [
      "Always add 10% extra for waste when ordering flooring, tile, or other materials",
      "Measure each room at the widest points — walls are rarely perfectly straight",
      "For L-shaped rooms, divide into two rectangles, calculate each, and add together",
      "1 acre = 43,560 square feet (roughly the size of a football field without end zones)",
    ],
    limitations: [
      "Assumes flat surfaces — sloped or vaulted areas require different calculations",
      "Wall square footage for painting differs from floor square footage",
      "Irregular shapes require approximation by breaking into simpler shapes",
    ],
  },

  "profit-margin-calculator": {
    whatIs: "The Profit Margin Calculator determines your business profitability by computing gross profit margin, net profit margin, and operating profit margin. It helps you understand how much of every dollar in revenue translates to actual profit after costs and expenses.",
    whatIsExtra: [
      "Profit margin is the single most important metric for evaluating business efficiency. High revenue means nothing if your margins are razor-thin. A $10 million company with 5% net margin earns $500,000 in profit, while a $2 million company with 30% net margin earns $600,000. Investors, lenders, and business owners all use margin analysis to assess business health.",
    ],
    howFormulaWorks: "Gross Margin = (Revenue − COGS) ÷ Revenue × 100. Operating Margin = Operating Income ÷ Revenue × 100. Net Margin = Net Income ÷ Revenue × 100.",
    formulaBreakdown: [
      "Gross Profit = Revenue − Cost of Goods Sold (COGS)",
      "Operating Profit = Gross Profit − Operating Expenses (rent, payroll, utilities)",
      "Net Profit = Operating Profit − Taxes − Interest − Other Expenses",
      "Each margin type tells a different story about business efficiency",
    ],
    howToUse: [
      "Enter your total revenue (sales)",
      "Enter your cost of goods sold (COGS)",
      "Optionally enter operating expenses for operating margin",
      "View your profit margins and dollar amounts",
    ],
    exampleTitle: "Example: Revenue $500,000, COGS $300,000, Operating Expenses $120,000",
    exampleContent: "Gross Profit = $200,000 (40% margin) | Operating Profit = $80,000 (16% margin) | If taxes = $16,000: Net Profit = $64,000 (12.8% margin)",
    tables: [
      {
        title: "Average Profit Margins by Industry",
        headers: ["Industry", "Gross Margin", "Net Margin"],
        rows: [
          ["Software/SaaS", "70–85%", "15–25%"],
          ["Restaurants", "60–70%", "3–9%"],
          ["Retail (General)", "25–35%", "2–5%"],
          ["Construction", "15–25%", "2–6%"],
          ["Manufacturing", "25–35%", "5–10%"],
          ["Healthcare", "55–65%", "5–15%"],
          ["Grocery Stores", "25–30%", "1–3%"],
          ["E-Commerce", "40–60%", "5–15%"],
        ],
      },
    ],
    tips: [
      "Track margins monthly — declining margins signal rising costs or pricing pressure",
      "Gross margin indicates pricing and production efficiency; net margin shows overall profitability",
      "Compare your margins to industry averages to benchmark performance",
      "Improving margins by just 2–3% can dramatically increase profitability on high revenue",
    ],
    limitations: [
      "Margins vary significantly by industry — a 5% net margin is excellent for groceries but poor for software",
      "Does not account for one-time expenses or seasonal variations",
      "High margins don't always mean a healthy business if revenue is declining",
    ],
  },

  "tdee-calculator": {
    whatIs: "The TDEE (Total Daily Energy Expenditure) Calculator estimates the total number of calories you burn per day, combining your Basal Metabolic Rate (BMR) with calories burned through physical activity, digestion, and non-exercise movement. TDEE is the most important number for any weight management goal.",
    whatIsExtra: [
      "TDEE consists of four components: BMR (60–70% of total), the Thermic Effect of Food or TEF (about 10%), Exercise Activity Thermogenesis or EAT (15–30%), and Non-Exercise Activity Thermogenesis or NEAT (the calories burned through fidgeting, walking, standing, etc.). NEAT is the most variable component and can differ by up to 700 calories/day between individuals with similar BMR.",
    ],
    howFormulaWorks: "TDEE = BMR × Activity Factor. BMR is calculated using the Mifflin-St Jeor equation. Activity factors range from 1.2 (sedentary) to 1.9 (extremely active).",
    howToUse: [
      "Enter your age, sex, weight, and height",
      "Select your activity level honestly",
      "View your estimated TDEE",
      "See calorie targets for weight loss, maintenance, and gain",
    ],
    exampleTitle: "Example: 28-Year-Old Female, 140 lbs, 5'6\", Moderately Active",
    exampleContent: "BMR = 1,398 cal/day | TDEE = 2,167 cal/day | To lose 1 lb/week: 1,667 cal | To gain 0.5 lb/week: 2,417 cal",
    tables: [
      {
        title: "TDEE by Activity Level (150 lb Male, 30 years, 5'9\")",
        headers: ["Activity Level", "BMR Multiplier", "TDEE", "Deficit for 1 lb/wk Loss"],
        rows: [
          ["Sedentary", "×1.2", "2,094 cal", "1,594 cal"],
          ["Lightly Active", "×1.375", "2,399 cal", "1,899 cal"],
          ["Moderately Active", "×1.55", "2,704 cal", "2,204 cal"],
          ["Very Active", "×1.725", "3,010 cal", "2,510 cal"],
          ["Extremely Active", "×1.9", "3,315 cal", "2,815 cal"],
        ],
      },
    ],
    tips: [
      "Most people overestimate their activity level — start with one level below what you think",
      "Eat at your TDEE to maintain weight, 500 below to lose ~1 lb/week, 250 above to gain ~0.5 lb/week",
      "Track your weight for 2–3 weeks while eating at your calculated TDEE to verify accuracy, then adjust",
      "TDEE changes as your weight changes — recalculate every 10–15 lbs",
    ],
    limitations: [
      "Activity multipliers are estimates — individual NEAT variation can be significant",
      "Doesn't account for metabolic adaptation from prolonged dieting",
      "People with more muscle mass burn more calories than formulas predict",
    ],
  },

  "due-date-calculator": {
    whatIs: "The Due Date Calculator estimates your baby's expected delivery date based on the first day of your last menstrual period (LMP) or conception date. It also shows your current week of pregnancy and trimester, and provides a timeline of key pregnancy milestones.",
    howFormulaWorks: "Naegele's Rule: Due Date = LMP + 280 days (40 weeks). From conception: Due Date = Conception Date + 266 days (38 weeks).",
    howToUse: [
      "Enter the first day of your last menstrual period, or",
      "Enter the estimated conception date",
      "View your estimated due date and current pregnancy week",
    ],
    exampleTitle: "Example: Last Period Started January 1, 2026",
    exampleContent: "Estimated Due Date: October 8, 2026 | Conception likely around January 14–15 | First trimester: Weeks 1–12 | Second: 13–27 | Third: 28–40",
    tables: [
      {
        title: "Pregnancy Trimester Timeline",
        headers: ["Trimester", "Weeks", "Key Developments"],
        rows: [
          ["First", "1–12", "Organ formation, heartbeat at 6 wks, morning sickness common"],
          ["Second", "13–27", "Movement felt (16–20 wks), gender visible, energy returns"],
          ["Third", "28–40", "Rapid growth, lung maturity, labor preparation"],
        ],
      },
    ],
    tips: [
      "Only about 5% of babies are born on their exact due date — it's an estimate",
      "Full term is considered 39–40 weeks; early term is 37–38 weeks",
      "First-time mothers tend to deliver slightly later than their due date on average",
      "An ultrasound in the first trimester is the most accurate way to confirm your due date",
    ],
    limitations: [
      "Assumes a 28-day menstrual cycle with ovulation on day 14 — cycles vary",
      "Not accurate for women with irregular periods",
      "Ultrasound dating may differ from LMP-based calculations",
    ],
  },

  "paint-calculator": {
    whatIs: "The Paint Calculator estimates how many gallons of paint you need for your project based on room dimensions, number of coats, and surface type. It accounts for doors, windows, and trim to give you an accurate purchase quantity and avoid costly over-buying or mid-project shortages.",
    howFormulaWorks: "Paint needed (gallons) = (Total wall area − Windows − Doors) × Number of coats ÷ Coverage rate. Standard coverage: 350–400 sq ft per gallon.",
    howToUse: [
      "Enter room dimensions (length, width, height)",
      "Enter the number of doors and windows to subtract",
      "Select the number of coats (1 or 2)",
      "View gallons needed and estimated cost",
    ],
    exampleTitle: "Example: 14×12 Room, 8ft Ceilings, 2 Windows, 1 Door, 2 Coats",
    exampleContent: "Wall area = 416 sq ft | Minus openings = −57 sq ft | Paintable area = 359 sq ft × 2 coats = 718 sq ft | Paint needed ≈ 2 gallons",
    tables: [
      {
        title: "Paint Coverage by Surface Type",
        headers: ["Surface", "Coverage per Gallon", "Notes"],
        rows: [
          ["Smooth drywall", "350–400 sq ft", "Standard coverage"],
          ["Textured walls", "250–300 sq ft", "Rough texture absorbs more paint"],
          ["Bare wood", "250–350 sq ft", "Primer coat recommended first"],
          ["Previously painted", "350–400 sq ft", "Best coverage on pre-primed surfaces"],
          ["Brick/masonry", "150–200 sq ft", "Porous surface requires more paint"],
          ["Metal", "300–400 sq ft", "Use appropriate metal primer first"],
        ],
      },
    ],
    tips: [
      "Always buy slightly more than calculated — running out mid-wall creates visible color differences",
      "Two thin coats provide better coverage than one thick coat",
      "Dark colors over light typically need 2 coats; light over dark may need 3",
      "One gallon covers about 350–400 sq ft on smooth surfaces",
      "Keep leftover paint for touch-ups — label it with the room and date",
    ],
    limitations: [
      "Coverage varies by paint brand, type (flat vs. semi-gloss), and application method (roller vs. brush vs. sprayer)",
      "Does not account for ceiling painting — calculate that separately",
      "Textured surfaces can require 25–40% more paint than smooth walls",
    ],
  },

  "electricity-cost-calculator": {
    whatIs: "The Electricity Cost Calculator estimates how much it costs to run electrical appliances based on their wattage, usage time, and your local electricity rate. It helps you identify energy-hungry devices, compare the running cost of different appliances, and find ways to reduce your electricity bill.",
    howFormulaWorks: "Cost = (Wattage × Hours of use per day × Days) ÷ 1000 × Electricity rate per kWh. kWh = kilowatt-hours.",
    howToUse: [
      "Enter the appliance wattage (found on the label or manual)",
      "Enter hours of daily use",
      "Enter your electricity rate ($/kWh)",
      "View daily, monthly, and annual running costs",
    ],
    exampleTitle: "Example: 1500W Space Heater, 8 hrs/day, $0.13/kWh",
    exampleContent: "Daily: 12 kWh × $0.13 = $1.56/day | Monthly: $46.80 | Annually: $569.40",
    tables: [
      {
        title: "Common Appliance Running Costs (at $0.13/kWh)",
        headers: ["Appliance", "Wattage", "Daily Use", "Monthly Cost"],
        rows: [
          ["LED Light Bulb", "10W", "8 hrs", "$0.31"],
          ["Laptop", "50W", "8 hrs", "$1.56"],
          ["Refrigerator", "150W", "24 hrs (cycling)", "$4.68"],
          ["Window AC", "1,200W", "8 hrs", "$37.44"],
          ["Electric Dryer", "5,000W", "1 hr", "$19.50"],
          ["Space Heater", "1,500W", "8 hrs", "$46.80"],
          ["Electric Oven", "2,500W", "1 hr", "$9.75"],
          ["Gaming PC", "500W", "4 hrs", "$7.80"],
        ],
      },
    ],
    tips: [
      "Switching from incandescent (60W) to LED (10W) bulbs can save $8–10 per bulb per year",
      "Unplug chargers and devices when not in use — 'vampire power' can add 5–10% to your bill",
      "Run dishwashers and washing machines during off-peak hours if your utility offers time-of-use rates",
      "A programmable thermostat can save 10–15% on heating and cooling costs annually",
    ],
    limitations: [
      "Actual consumption may differ from rated wattage (e.g., refrigerators cycle on and off)",
      "Does not account for variable electricity rates (tiered pricing, time-of-use rates)",
      "Wattage varies by settings — a fan on low uses much less than on high",
    ],
  },

  "fuel-cost-calculator": {
    whatIs: "The Fuel Cost Calculator estimates the total fuel cost for a trip based on distance, vehicle fuel efficiency (MPG or L/100km), and current fuel prices. It helps you budget for road trips, compare the cost of driving vs. flying, and evaluate the fuel savings of different vehicles.",
    howFormulaWorks: "Fuel needed = Distance ÷ MPG. Total cost = Fuel needed × Price per gallon. For metric: Fuel (L) = (L/100km × Distance) ÷ 100.",
    howToUse: [
      "Enter the trip distance in miles or kilometers",
      "Enter your vehicle's fuel efficiency (MPG or L/100km)",
      "Enter the current fuel price per gallon or liter",
      "View total fuel needed and trip cost",
    ],
    exampleTitle: "Example: 500-Mile Road Trip, 28 MPG, $3.50/gallon",
    exampleContent: "Fuel needed = 500 ÷ 28 = 17.86 gallons | Cost = 17.86 × $3.50 = $62.50 | Per mile = $0.125",
    tables: [
      {
        title: "Annual Fuel Cost by Vehicle MPG (15,000 miles/year)",
        headers: ["MPG", "Gallons/Year", "At $3.00/gal", "At $3.50/gal", "At $4.00/gal"],
        rows: [
          ["15 MPG", "1,000 gal", "$3,000", "$3,500", "$4,000"],
          ["20 MPG", "750 gal", "$2,250", "$2,625", "$3,000"],
          ["25 MPG", "600 gal", "$1,800", "$2,100", "$2,400"],
          ["30 MPG", "500 gal", "$1,500", "$1,750", "$2,000"],
          ["35 MPG", "429 gal", "$1,286", "$1,500", "$1,714"],
          ["40 MPG", "375 gal", "$1,125", "$1,313", "$1,500"],
          ["50 MPG (Hybrid)", "300 gal", "$900", "$1,050", "$1,200"],
        ],
      },
    ],
    tips: [
      "Improving from 15 MPG to 25 MPG saves more fuel than going from 30 MPG to 50 MPG (for the same distance)",
      "Highway driving at 55–65 mph is typically the most fuel-efficient speed",
      "Proper tire inflation improves fuel efficiency by up to 3%",
      "Each extra 100 lbs of cargo reduces MPG by approximately 1%",
    ],
    limitations: [
      "Actual MPG varies based on driving conditions, terrain, speed, and driving style",
      "City vs. highway driving can differ by 20–30% in fuel efficiency",
      "Does not include tolls, maintenance, or wear-and-tear costs",
    ],
  },

  "date-calculator": {
    whatIs: "The Date Calculator finds the difference between two dates or adds/subtracts days, weeks, months, and years from a date. It's useful for calculating deadlines, project timelines, contract durations, event countdowns, and age-related computations.",
    howFormulaWorks: "Calculates the exact difference between two dates accounting for varying month lengths (28–31 days) and leap years (every 4 years, except centuries not divisible by 400).",
    howToUse: [
      "Enter a start date and end date, or",
      "Enter a start date and number of days/weeks/months to add or subtract",
      "View the result with breakdown in multiple units",
    ],
    exampleTitle: "Example: From March 14, 2026 to December 25, 2026",
    exampleContent: "286 days | 9 months and 11 days | 40 weeks and 6 days | 6,864 hours",
    tips: [
      "Business days exclude weekends (Saturday and Sunday) and usually holidays",
      "A 'fortnight' is exactly 14 days or 2 weeks",
      "Months have different lengths — always verify exact day counts for precise calculations",
    ],
    limitations: [
      "Business day calculations may not account for all public holidays in your region",
      "Does not account for timezone changes or daylight saving time transitions",
    ],
  },

  "sleep-calculator": {
    whatIs: "The Sleep Calculator determines the best times to go to sleep or wake up based on 90-minute sleep cycles. It helps you wake up between cycles rather than in the middle of one, reducing morning grogginess and improving sleep quality.",
    whatIsExtra: [
      "A complete sleep cycle lasts about 90 minutes and progresses through stages: light sleep (N1 and N2), deep sleep (N3 or slow-wave sleep), and REM (Rapid Eye Movement) sleep. Most adults need 5–6 complete cycles (7.5–9 hours) per night. Waking up at the end of a cycle, during light sleep, leaves you feeling refreshed. Waking during deep sleep causes sleep inertia — that heavy, groggy feeling.",
    ],
    howFormulaWorks: "Optimal wake times = Bedtime + (90 minutes × number of cycles) + 15 minutes (time to fall asleep). Recommended: 5 or 6 complete cycles.",
    howToUse: [
      "Enter the time you need to wake up, or the time you want to go to bed",
      "View the optimal sleep/wake times based on 90-minute cycles",
      "Aim for 5–6 complete cycles for best results",
    ],
    exampleTitle: "Example: Need to Wake at 7:00 AM",
    exampleContent: "Best bedtimes: 9:30 PM (6 cycles, 9h), 11:00 PM (5 cycles, 7.5h), or 12:30 AM (4 cycles, 6h) — includes 15 min to fall asleep",
    tables: [
      {
        title: "Recommended Sleep Duration by Age Group",
        headers: ["Age Group", "Recommended Hours", "Sleep Cycles"],
        rows: [
          ["Newborns (0–3 mo)", "14–17 hours", "—"],
          ["Infants (4–11 mo)", "12–15 hours", "—"],
          ["Toddlers (1–2 yr)", "11–14 hours", "—"],
          ["Preschool (3–5 yr)", "10–13 hours", "—"],
          ["School Age (6–13 yr)", "9–11 hours", "6–7 cycles"],
          ["Teens (14–17 yr)", "8–10 hours", "5–7 cycles"],
          ["Adults (18–64 yr)", "7–9 hours", "5–6 cycles"],
          ["Older Adults (65+)", "7–8 hours", "5 cycles"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Tips for Better Sleep Quality",
        content: "Maintain a consistent sleep schedule — go to bed and wake up at the same times every day, even on weekends. Keep your bedroom cool (65–68°F / 18–20°C), dark, and quiet. Avoid screens (blue light) for at least 30 minutes before bed. Limit caffeine after 2 PM (it has a 6-hour half-life). Avoid heavy meals within 2–3 hours of bedtime. Regular exercise improves sleep quality, but avoid intense workouts within 2 hours of bedtime.",
      },
    ],
    tips: [
      "It takes the average person 10–20 minutes to fall asleep — factor this into your bedtime",
      "Consistency matters more than duration — a regular 7-hour schedule beats irregular 8+ hours",
      "If you can't fall asleep within 20 minutes, get up and do something relaxing until you feel sleepy",
      "Naps of 20 minutes (power nap) or 90 minutes (full cycle) are most effective — avoid 45–60 minute naps",
    ],
    limitations: [
      "Sleep cycle length varies between individuals (80–120 minutes, average 90)",
      "Sleep quality depends on many factors beyond timing",
      "Does not account for sleep disorders like sleep apnea or insomnia",
    ],
  },

  "water-intake-calculator": {
    whatIs: "The Water Intake Calculator estimates how much water you should drink daily based on your body weight, activity level, and climate. Proper hydration is essential for digestion, circulation, temperature regulation, joint lubrication, and cognitive function.",
    howFormulaWorks: "Base intake = Body weight (lbs) × 0.5–1.0 oz (or Body weight (kg) × 30–40 mL). Adjust upward for exercise (+12 oz per 30 min), hot climate (+16–32 oz), and altitude.",
    howToUse: [
      "Enter your body weight",
      "Select your activity level and climate",
      "View your recommended daily water intake in ounces, cups, and liters",
    ],
    exampleTitle: "Example: 160 lb Person, Moderately Active, Temperate Climate",
    exampleContent: "Base: 80 oz (2.4 L) | With exercise (30 min): 92 oz (2.7 L) | That's about 10 cups or 5.5 standard water bottles (16.9 oz)",
    tables: [
      {
        title: "Daily Water Intake Guide by Body Weight",
        headers: ["Body Weight", "Sedentary", "Active", "Very Active/Hot Climate"],
        rows: [
          ["120 lbs (54 kg)", "60 oz (1.8 L)", "72 oz (2.1 L)", "84 oz (2.5 L)"],
          ["150 lbs (68 kg)", "75 oz (2.2 L)", "90 oz (2.7 L)", "105 oz (3.1 L)"],
          ["180 lbs (82 kg)", "90 oz (2.7 L)", "108 oz (3.2 L)", "126 oz (3.7 L)"],
          ["200 lbs (91 kg)", "100 oz (3.0 L)", "120 oz (3.5 L)", "140 oz (4.1 L)"],
          ["220 lbs (100 kg)", "110 oz (3.3 L)", "132 oz (3.9 L)", "154 oz (4.6 L)"],
        ],
      },
    ],
    tips: [
      "Drink water consistently throughout the day rather than all at once",
      "About 20% of daily water intake comes from food (fruits, vegetables, soups)",
      "Urine color is a simple hydration check — pale yellow = well hydrated, dark yellow = drink more",
      "Coffee and tea count toward daily intake despite mild diuretic effects",
    ],
    limitations: [
      "Individual needs vary based on health conditions, medications, and metabolism",
      "Does not replace medical advice for conditions requiring fluid restriction (kidney disease, heart failure)",
      "Needs increase significantly during illness, pregnancy, and breastfeeding",
    ],
  },

  "standard-calculator": {
    whatIs: "The Standard Calculator performs basic arithmetic operations — addition, subtraction, multiplication, and division. It features a clean, intuitive interface similar to a physical calculator, with memory functions, percentage calculations, and a calculation history for reviewing previous results.",
    howFormulaWorks: "Follows standard mathematical order of operations (PEMDAS/BODMAS): Parentheses first, then Exponents, Multiplication and Division (left to right), Addition and Subtraction (left to right).",
    howToUse: [
      "Enter numbers using the on-screen buttons or keyboard",
      "Select the operation (+, −, ×, ÷)",
      "Press = or Enter for the result",
      "Use C to clear the current entry, AC to clear all",
    ],
    exampleTitle: "Example Calculations",
    exampleContent: "245 + 378 = 623 | 1,000 − 347 = 653 | 24 × 15 = 360 | 840 ÷ 12 = 70 | 15% of 280 = 42",
    tips: [
      "Use keyboard shortcuts for faster calculations: +, −, *, /, Enter, Backspace",
      "Memory functions: M+ adds to memory, M- subtracts from memory, MR recalls stored value",
      "The ± button toggles between positive and negative numbers",
    ],
    limitations: [
      "Does not support advanced functions (trigonometry, logarithms, exponents) — use the Scientific Calculator for those",
      "Floating-point arithmetic may produce tiny rounding errors in some decimal calculations",
    ],
  },

  "gst-vat-calculator": {
    whatIs: "The GST/VAT Calculator computes Goods and Services Tax or Value Added Tax on purchases and sales. It calculates the tax-inclusive and tax-exclusive prices, helping businesses with invoicing, pricing strategy, and tax compliance across different countries and tax rates.",
    howFormulaWorks: "Tax Amount = Net Price × (Tax Rate ÷ 100). Gross Price = Net Price + Tax. Net Price = Gross Price ÷ (1 + Tax Rate ÷ 100).",
    howToUse: [
      "Enter the price (before or after tax)",
      "Enter the GST/VAT rate for your country",
      "Select whether the entered price includes or excludes tax",
      "View the net price, tax amount, and gross price",
    ],
    exampleTitle: "Example: Product Net Price $200, 20% VAT",
    exampleContent: "VAT Amount = $200 × 20% = $40 | Gross Price = $240 | Reverse: If $240 includes VAT, Net = $240 ÷ 1.20 = $200",
    tables: [
      {
        title: "VAT/GST Rates Around the World (2024)",
        headers: ["Country", "Standard Rate", "Reduced Rate(s)"],
        rows: [
          ["United Kingdom", "20%", "5% (fuel, sanitary), 0% (food, children's clothes)"],
          ["Germany", "19%", "7% (food, books, hotels)"],
          ["France", "20%", "10%, 5.5%, 2.1%"],
          ["Australia (GST)", "10%", "0% (fresh food, medical, education)"],
          ["India (GST)", "18%", "5%, 12%, 28%"],
          ["Canada (GST)", "5%", "HST varies by province (13–15%)"],
          ["Japan", "10%", "8% (food, non-alcoholic beverages)"],
          ["UAE (VAT)", "5%", "0% (specific categories)"],
        ],
      },
    ],
    tips: [
      "When quoting prices to consumers, many countries require showing the tax-inclusive (gross) price",
      "B2B transactions often quote tax-exclusive (net) prices",
      "Keep records of all VAT/GST paid on business purchases — you can usually claim it back as input tax credit",
    ],
    limitations: [
      "Tax rates change — always verify current rates with your local tax authority",
      "Does not handle complex multi-rate scenarios or exemptions",
      "VAT/GST rules for digital services and cross-border transactions are complex and country-specific",
    ],
  },

  "pace-calculator": {
    whatIs: "The Pace Calculator determines your running or walking pace, finish time, or distance based on two known values. Essential for runners training for races, setting personal goals, and planning workout intensities for 5K, 10K, half marathon, and marathon distances.",
    howFormulaWorks: "Pace = Time ÷ Distance. Finish Time = Pace × Distance. Distance = Time ÷ Pace. Pace is typically expressed as minutes per mile or minutes per kilometer.",
    howToUse: [
      "Enter any two values: distance, time, or pace",
      "Select your preferred units (miles or kilometers)",
      "View the calculated third value",
      "Compare pace across common race distances",
    ],
    exampleTitle: "Example: 5K in 25 Minutes",
    exampleContent: "Pace = 8:03/mile (5:00/km) | Equivalent 10K time ≈ 52:00 | Half marathon ≈ 1:55:00 | Marathon ≈ 4:00:00",
    tables: [
      {
        title: "Race Finish Times by Pace",
        headers: ["Pace (min/mile)", "5K (3.1 mi)", "10K (6.2 mi)", "Half Marathon", "Marathon"],
        rows: [
          ["6:00", "18:38", "37:17", "1:18:34", "2:37:19"],
          ["7:00", "21:45", "43:29", "1:31:40", "3:03:33"],
          ["8:00", "24:51", "49:42", "1:44:47", "3:29:46"],
          ["9:00", "27:58", "55:54", "1:57:53", "3:55:60"],
          ["10:00", "31:04", "62:06", "2:11:00", "4:22:13"],
          ["11:00", "34:10", "68:18", "2:24:06", "4:48:26"],
          ["12:00", "37:17", "74:31", "2:37:12", "5:14:40"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Training Zones by Pace",
        content: "Easy/recovery runs should be 1–2 minutes per mile slower than race pace. Tempo runs are at a 'comfortably hard' pace you could sustain for about an hour. Interval training involves short bursts at faster-than-race pace with recovery periods. Long runs should be at easy pace (60–70% of max effort). Most training plans recommend 80% of running at easy pace and 20% at harder efforts.",
      },
    ],
    tips: [
      "Most beginners should aim for a comfortable conversational pace — if you can't talk, slow down",
      "Negative splits (running the second half faster) is generally the best race strategy",
      "A common rule of thumb: your 10K pace is roughly your 5K pace + 30–45 seconds per mile",
      "Walk breaks (run/walk method) can help beginners complete longer distances and are used by many experienced runners too",
    ],
    limitations: [
      "Race-day performance is affected by weather, terrain, elevation, nutrition, and race-day nerves",
      "Pace calculators assume even effort — hills, wind, and fatigue affect actual pace",
      "Race time predictions become less accurate when extrapolating to much longer distances",
    ],
  },

  "macro-calculator": {
    whatIs: "The Macro Calculator determines your optimal daily intake of macronutrients — protein, carbohydrates, and fats — based on your body weight, activity level, and fitness goals. Whether you're trying to lose fat, build muscle, or maintain your current physique, getting the right macro split is key to achieving results.",
    howFormulaWorks: "Step 1: Calculate TDEE. Step 2: Adjust calories for goal (deficit for fat loss, surplus for muscle gain). Step 3: Distribute calories across macros based on selected ratio.",
    formulaBreakdown: [
      "Protein: 4 calories per gram",
      "Carbohydrates: 4 calories per gram",
      "Fat: 9 calories per gram",
      "Common splits: 40/30/30 (moderate), 40/40/20 (low fat), 30/35/35 (balanced)",
    ],
    howToUse: [
      "Enter your body weight, height, age, and sex",
      "Select your activity level",
      "Choose your goal: lose fat, maintain, or build muscle",
      "View your daily macro targets in grams",
    ],
    exampleTitle: "Example: 170 lb Male, Moderately Active, Fat Loss Goal",
    exampleContent: "TDEE: 2,600 cal | Target: 2,100 cal (500 deficit) | Protein: 170g (680 cal) | Carbs: 210g (840 cal) | Fat: 64g (580 cal)",
    tables: [
      {
        title: "Recommended Protein Intake by Goal",
        headers: ["Goal", "Protein (g/lb body weight)", "For 170 lb Person"],
        rows: [
          ["Fat Loss (preserve muscle)", "0.8–1.2 g/lb", "136–204g"],
          ["Muscle Building", "0.8–1.0 g/lb", "136–170g"],
          ["Maintenance", "0.6–0.8 g/lb", "102–136g"],
          ["Endurance Athletes", "0.5–0.7 g/lb", "85–119g"],
          ["Sedentary Adults", "0.4–0.5 g/lb", "68–85g"],
        ],
      },
    ],
    tips: [
      "Protein is the most important macro for body composition — prioritize hitting your protein target",
      "Spread protein intake across 3–5 meals for optimal absorption (20–40g per meal)",
      "If tracking feels overwhelming, start by tracking just protein and calories",
      "Fiber intake (25–38g/day) is important but often overlooked in macro tracking",
    ],
    limitations: [
      "Optimal macro ratios are debated — there's no single 'best' split for everyone",
      "Individual response to different macro ratios varies based on genetics and activity type",
      "Does not account for micronutrient (vitamin/mineral) needs",
    ],
  },

  "stock-profit-loss-calculator": {
    whatIs: "The Stock Profit/Loss Calculator determines your gain or loss on stock investments. It accounts for buy price, sell price, number of shares, and trading commissions to show your net profit, return percentage, and annualized return.",
    howFormulaWorks: "Profit = (Sell Price − Buy Price) × Shares − Total Commissions. ROI = Profit ÷ Total Investment × 100.",
    howToUse: [
      "Enter the buy price per share and number of shares",
      "Enter the sell price per share",
      "Optionally enter commission fees",
      "View your net profit/loss and return percentage",
    ],
    exampleTitle: "Example: Bought 50 Shares at $120, Sold at $156",
    exampleContent: "Investment = $6,000 | Proceeds = $7,800 | Profit = $1,800 | Return = 30% | If held 2 years: Annualized = 14.02%",
    tables: [
      {
        title: "Impact of Fees on Returns ($10,000 Investment, 1-Year Hold)",
        headers: ["Annual Fee", "Effective Return (8% gross)", "10-Year Impact"],
        rows: [
          ["0% (no fee)", "8.0%", "$0 lost"],
          ["0.1% (index fund)", "7.9%", "~$200 lost"],
          ["0.5%", "7.5%", "~$1,100 lost"],
          ["1.0%", "7.0%", "~$2,200 lost"],
          ["2.0% (active fund)", "6.0%", "~$4,600 lost"],
        ],
      },
    ],
    tips: [
      "Always factor in commissions and fees when calculating actual returns",
      "Short-term capital gains (held < 1 year) are taxed at your regular income rate; long-term gains (held > 1 year) get favorable tax rates",
      "Dollar-cost averaging reduces the impact of buying at market highs",
      "Diversification across sectors and asset classes reduces portfolio risk",
    ],
    limitations: [
      "Does not calculate tax obligations on gains",
      "Does not account for dividends received during the holding period",
      "Past stock performance does not predict future results",
    ],
  },

  "debt-to-income-calculator": {
    whatIs: "The Debt-to-Income (DTI) Ratio Calculator measures the percentage of your gross monthly income that goes toward paying debts. Lenders use DTI as a key factor in determining your creditworthiness for mortgages, auto loans, and other credit products.",
    howFormulaWorks: "DTI Ratio = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100.",
    howToUse: [
      "Enter your gross monthly income (before taxes)",
      "Enter all monthly debt payments (mortgage/rent, car loans, student loans, credit cards, etc.)",
      "View your DTI ratio and how lenders evaluate it",
    ],
    exampleTitle: "Example: $6,000/month Gross Income",
    exampleContent: "Mortgage: $1,500 + Car: $400 + Student Loan: $300 + Credit Cards: $200 = $2,400 total debt | DTI = $2,400 ÷ $6,000 = 40%",
    tables: [
      {
        title: "DTI Ratio Evaluation by Lenders",
        headers: ["DTI Range", "Rating", "Lending Implications"],
        rows: [
          ["Under 20%", "Excellent", "Best loan terms, easily approved"],
          ["20–35%", "Good", "Generally approved with favorable rates"],
          ["36–43%", "Acceptable", "May qualify with compensating factors"],
          ["44–49%", "High Risk", "Difficult to get approved; higher rates"],
          ["50%+", "Very High Risk", "Most lenders will decline"],
        ],
      },
    ],
    additionalSections: [
      {
        title: "Front-End vs. Back-End DTI",
        content: "The front-end DTI (or housing ratio) only includes housing costs — mortgage payment, property tax, insurance, and HOA fees. Most lenders want this below 28%. The back-end DTI includes all monthly debts (housing + car loans + student loans + credit cards + any other obligations). Most conventional mortgages require a back-end DTI of 43% or less, though FHA loans may allow up to 50% with strong compensating factors.",
      },
    ],
    tips: [
      "Most conventional mortgage lenders require DTI below 43%; FHA allows up to 50%",
      "Reduce DTI by paying off small debts before applying for a mortgage",
      "Increasing income is just as effective as reducing debt for improving DTI",
      "DTI does not include expenses like utilities, groceries, or insurance — only debt payments",
    ],
    limitations: [
      "Uses gross income (before tax), not take-home pay — actual financial stress may be higher",
      "Does not account for living expenses, savings goals, or financial obligations not classified as debt",
      "Minimum credit card payments fluctuate as balances change",
    ],
  },

  "rebar-weight-calculator": {
    whatIs: "The Rebar Weight Calculator estimates the total weight of reinforcing steel bars (rebar) needed for your construction project based on bar size, length, and quantity. It helps with material ordering, transportation planning, and cost estimation for concrete reinforcement projects.",
    howFormulaWorks: "Weight = Length × Weight per linear foot × Quantity. Weight per foot varies by bar size: #3 = 0.376 lb/ft, #4 = 0.668 lb/ft, #5 = 1.043 lb/ft, etc.",
    howToUse: [
      "Select the rebar size (bar number)",
      "Enter the length of each bar",
      "Enter the quantity of bars needed",
      "View the total weight in pounds and kilograms",
    ],
    exampleTitle: "Example: 20 pieces of #5 Rebar, 20 ft each",
    exampleContent: "Weight per foot = 1.043 lbs | Per bar = 20.86 lbs | Total = 417.2 lbs (189.3 kg)",
    tables: [
      {
        title: "Rebar Size Reference Chart",
        headers: ["Bar #", "Diameter (in)", "Diameter (mm)", "Weight (lb/ft)", "Weight (kg/m)"],
        rows: [
          ["#3", "0.375", "9.5", "0.376", "0.560"],
          ["#4", "0.500", "12.7", "0.668", "0.994"],
          ["#5", "0.625", "15.9", "1.043", "1.552"],
          ["#6", "0.750", "19.1", "1.502", "2.235"],
          ["#7", "0.875", "22.2", "2.044", "3.042"],
          ["#8", "1.000", "25.4", "2.670", "3.973"],
          ["#9", "1.128", "28.7", "3.400", "5.059"],
          ["#10", "1.270", "32.3", "4.303", "6.404"],
        ],
      },
    ],
    tips: [
      "#4 and #5 rebar are the most commonly used sizes for residential foundations and slabs",
      "Add 10–15% to your order for laps (overlap joints), waste, and cutting",
      "Standard rebar lengths are 20 ft (6m) — factor overlap joints every 20 ft",
      "Epoxy-coated rebar costs more but resists corrosion in exposed or high-moisture applications",
    ],
    limitations: [
      "Does not calculate required rebar spacing or structural requirements — consult an engineer",
      "Weights are nominal — actual weights may vary slightly by manufacturer",
      "Does not include the weight of tie wire or chairs/supports",
    ],
  },

  "tile-calculator": {
    whatIs: "The Tile Calculator estimates the number of tiles needed for your floor, wall, or backsplash project based on the area dimensions and tile size. It factors in waste for cuts and breakage, helping you order the right quantity and avoid costly extra trips to the store.",
    howFormulaWorks: "Tiles needed = (Area to tile ÷ Area per tile) × (1 + Waste factor). Area per tile = Tile length × Tile width. Standard waste factor = 10–15%.",
    howToUse: [
      "Enter the area dimensions (length and width)",
      "Enter the tile size (e.g., 12×12, 18×18, 24×24)",
      "Select a waste percentage (10% standard, 15% for diagonals)",
      "View total tiles needed and total area coverage",
    ],
    exampleTitle: "Example: 10×12 ft Bathroom Floor, 12×12\" Tiles",
    exampleContent: "Area = 120 sq ft | Tiles per sq ft = 1 | Base tiles = 120 | With 10% waste = 132 tiles | At $2.50/tile = $330",
    tables: [
      {
        title: "Common Tile Sizes and Coverage",
        headers: ["Tile Size", "Area per Tile (sq ft)", "Tiles per sq ft", "For 100 sq ft (+10%)"],
        rows: [
          ["4×4\"", "0.111", "9.0", "990 tiles"],
          ["6×6\"", "0.25", "4.0", "440 tiles"],
          ["12×12\"", "1.0", "1.0", "110 tiles"],
          ["12×24\"", "2.0", "0.5", "55 tiles"],
          ["18×18\"", "2.25", "0.44", "49 tiles"],
          ["24×24\"", "4.0", "0.25", "28 tiles"],
        ],
      },
    ],
    tips: [
      "Add 10% waste for straight layouts, 15% for diagonal patterns, 20% for complex designs",
      "Buy all tiles from the same lot/batch number to ensure consistent color",
      "Keep 5–10 extra tiles for future repairs — matching tiles later can be difficult or impossible",
      "Larger tiles cover more area but require a flatter substrate and produce more waste at edges",
    ],
    limitations: [
      "Does not account for grout lines (typically 1/16\" to 1/4\"), which slightly reduce tile coverage",
      "Irregular room shapes may require more waste than calculated",
      "Does not calculate adhesive, grout, or other installation materials needed",
    ],
  },

  "house-affordability-calculator": {
    whatIs: "The House Affordability Calculator estimates the maximum home price you can afford based on your income, debts, down payment, and interest rate. It uses standard lending guidelines to give you a realistic budget before you start house hunting.",
    howFormulaWorks: "Maximum mortgage = Payment you can afford × [(1+r)^n − 1] ÷ [r × (1+r)^n]. Affordable payment = Gross income × 0.28 (front-end ratio) minus property tax and insurance estimates.",
    howToUse: [
      "Enter your annual household income",
      "Enter your monthly debt payments",
      "Enter your available down payment",
      "Enter the expected interest rate and loan term",
      "View the maximum home price you can afford",
    ],
    exampleTitle: "Example: $90,000 Income, $500/month Debts, $40,000 Down, 6.5% Rate",
    exampleContent: "Max monthly payment (28% rule): $2,100 | Minus taxes/insurance: ~$1,650 for P&I | Max mortgage: ~$261,000 | Max home price: ~$301,000",
    tables: [
      {
        title: "Home Affordability by Income (20% Down, 6.5%, 30-Year, Low Debt)",
        headers: ["Annual Income", "Max Monthly Housing", "Est. Home Price"],
        rows: [
          ["$50,000", "$1,167", "$175,000 – $200,000"],
          ["$75,000", "$1,750", "$275,000 – $310,000"],
          ["$100,000", "$2,333", "$370,000 – $420,000"],
          ["$125,000", "$2,917", "$465,000 – $530,000"],
          ["$150,000", "$3,500", "$560,000 – $640,000"],
        ],
      },
    ],
    tips: [
      "Just because you qualify for a certain amount doesn't mean you should borrow it — leave room for other financial goals",
      "The 28/36 rule is a guideline, not a mandate — factor in your personal lifestyle and expenses",
      "Don't forget closing costs (2–5% of home price) and moving expenses when budgeting",
      "A larger down payment means a smaller loan, lower monthly payments, and no PMI (at 20%+)",
    ],
    limitations: [
      "Estimates are based on general lending guidelines — actual approval depends on credit score, employment history, and lender criteria",
      "Does not account for HOA fees, maintenance costs, or utility expenses",
      "Property tax and insurance rates vary significantly by location",
    ],
  },
};

export function getSEOContent(slug: string): SEOContentSection | null {
  return contentTemplates[slug] || null;
}

export function getGenericSEOContent(name: string, description: string): SEOContentSection {
  return {
    whatIs: `The ${name} is a free online tool that helps you ${description.toLowerCase().replace(/\.$/, "")}. Get instant, accurate results with our easy-to-use calculator.`,
    howFormulaWorks: `Enter your values and our ${name} will compute the result using standard mathematical formulas. All calculations happen instantly in your browser.`,
    howToUse: [
      "Enter the required values in the input fields",
      "Click the Calculate button",
      "View your results instantly",
      "Use Clear to reset and try different values",
    ],
    exampleTitle: `Using the ${name}`,
    exampleContent: `Enter your values and get instant, accurate results. Try different scenarios to compare outcomes.`,
  };
}

export function getAllSEOContentSlugs(): string[] {
  return Object.keys(contentTemplates);
}
