import { transactions } from "./transactions-data";

export async function getTransactions({ take, skip, where }) {
  const filteredTransactions = getFilterResults(where);

  const paginatedResults = getPaginatedResults(filteredTransactions, {
    take,
    skip,
  });

  return paginatedResults;
}

export async function getTransactionsCount(where) {
  if (!where) {
    return transactions.length;
  }

  const filteredTransactions = getFilterResults(where);
  return filteredTransactions.length;
}

function getFilterResults(where) {
  let transactionsList = [...transactions];

  // support filtering
  for (let key in where) {
    if (key === "customer") {
      transactionsList = transactionsList.filter(
        (t) => t.customer === where.customer
      );
    }

    if (key === "amount") {
      transactionsList ===
        transactionsList.filter((t) => t.amount == where.amount);
    }

    if (key === "transaction_id") {
      transactionsList = transactionsList.filter(
        (t) => t.transaction_id === where.transaction_id
      );
    }
  }

  return transactionsList;
}

function getPaginatedResults(data, { take, skip }) {
  const transactions = [...data];

  if (take && skip) {
    return transactions.slice(skip, skip + take);
  }

  if (take && !skip) {
    return transactions.slice(0, take);
  }

  if (!take && skip) {
    return transactions.slice(skip);
  }

  return transactions;
}
