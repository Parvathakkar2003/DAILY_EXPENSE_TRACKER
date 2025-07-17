
import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransection }) => {
  // category
  const categories = [
    "cashback",
    "bonus",
    "investments",
    "rent",
    "salary",
    "stock",
    "project",
    "food",
    "movie",
    "bills",
    "fees",
    "tax",
  ];

  // total transaction
  const totalTransaction = allTransection.length;
  const totalIncomeTransactions = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  // total Turnover
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverpercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverpercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  // Sort categories based on their percentage of total income turnover
  categories.sort((a, b) => {
    const incomeAmountA = allTransection
      .filter(
        (transaction) =>
          transaction.type === "income" && transaction.category === a
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const incomeAmountB = allTransection
      .filter(
        (transaction) =>
          transaction.type === "income" && transaction.category === b
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const incomePercentA = (incomeAmountA / totalIncomeTurnover) * 100;
    const incomePercentB = (incomeAmountB / totalIncomeTurnover) * 100;
    return incomePercentB - incomePercentA;
  });

  // Sort categories based on their percentage of total expense turnover
  categories.sort((a, b) => {
    const expenseAmountA = allTransection
      .filter(
        (transaction) =>
          transaction.type === "expense" && transaction.category === a
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expenseAmountB = allTransection
      .filter(
        (transaction) =>
          transaction.type === "expense" && transaction.category === b
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expensePercentA = (expenseAmountA / totalExpenseTurnover) * 100;
    const expensePercentB = (expenseAmountB / totalExpenseTurnover) * 100;
    return expensePercentB - expensePercentA;
  });

  return (
    <>
      <div className="row m-3">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: "#57BA98" }}>
              Total Transactions
            </div>
            <div className="card-body">
              <div className="text-success">
                Income : {totalIncomeTransactions.length}
              </div>
              <div className="text-success">
                Expense : {totalExpenseTransactions.length}
              </div>
              <div className="d-flex justify-content-center">
                <Progress
                  type="circle"
                  strokeColor={"#2B7A78"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                  format={(percent) => (percent < 100 ? `${percent}%` : "100%")}
                />
                <Progress
                  type="circle"
                  strokeColor={"#2B7A78"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                  format={(percent) => (percent < 100 ? `${percent}%` : "100%")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: "#57BA98" }}>
              Total Turnover : {totalTurnover}
            </div>
            <div className="card-body">
              <div className="text-success">Income : {totalIncomeTurnover}</div>
              <div className="text-success">
                Expense : {totalExpenseTurnover}
              </div>
              <div className="d-flex justify-content-center">
                <Progress
                  type="circle"
                  strokeColor={"#2B7A78"}
                  className="mx-2"
                  percent={totalIncomeTurnoverpercent.toFixed(0)}
                  format={(percent) => (percent < 100 ? `${percent}%` : "100%")}
                />
                <Progress
                  type="circle"
                  strokeColor={"#2B7A78"}
                  className="mx-2"
                  percent={totalExpenseTurnoverpercent.toFixed(0)}
                  format={(percent) => (percent < 100 ? `${percent}%` : "100%")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#57BA98" }}
                >
                  Category Wise Income
                </div>
                {categories.map((category) => {
                  const amount = allTransection
                    .filter(
                      (transaction) =>
                        transaction.type === "income" &&
                        transaction.category === category
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                  return (
                    amount > 0 && (
                      <div key={category} className="card-body">
                        <h5>{category}</h5>
                        <Progress
                          percent={(
                            (amount / totalIncomeTurnover) *
                            100
                          ).toFixed(0)}
                          strokeColor={"#2B7A78"} // Change to green for income
                          format={(percent) => `${percent}%`}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-3">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#57BA98" }}
                >
                  Category Wise Expense
                </div>
                {categories.map((category) => {
                  const amount = allTransection
                    .filter(
                      (transaction) =>
                        transaction.type === "expense" &&
                        transaction.category === category
                    )
                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                  return (
                    amount > 0 && (
                      <div key={category} className="card-body">
                        <h5>{category}</h5>
                        <Progress
                          percent={(
                            (amount / totalExpenseTurnover) *
                            100
                          ).toFixed(0)}
                          strokeColor={"#2B7A78"} // Change to red for expense
                          format={(percent) => `${percent}%`}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
