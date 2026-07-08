import React from "react";
import Icon from "../Elements/Icon";

// Mapping kategori ke icon yang sudah tersedia di Icon.jsx
const iconMap = {
  Housing: Icon.House,
  Food: Icon.Food,
  Transportation: Icon.Transport,
  Entertainment: Icon.Movie,
  Shopping: Icon.Shopping,
  Others: Icon.Other,
};

function CardExpenseCategory({
  category,
  amount,
  percentage,
  trend, // "up" | "down"
  transactions = [],
}) {
  const CategoryIcon = iconMap[category] || Icon.Other;
  const isUp = trend === "up";

  return (
    <div className="bg-white rounded-2xl p-5">
      {/* Header: icon, nama kategori, amount, dan persentase perbandingan */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-md p-2 me-3">
            <CategoryIcon size={20} />
          </div>
          <div>
            <div className="text-sm text-gray-03">{category}</div>
            <div className="font-bold text-lg">${amount}</div>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`flex items-center justify-end font-semibold text-sm ${
              isUp ? "text-red-500" : "text-green-500"
            }`}
          >
            {percentage}%
            {isUp ? (
              <Icon.ArrowUp size={14} className="ms-1" />
            ) : (
              <Icon.ArrowDown size={14} className="ms-1" />
            )}
          </div>
          <div className="text-xs text-gray-03">Compare to the last month</div>
        </div>
      </div>

      {/* List sub-transaksi */}
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-03">Belum ada transaksi</p>
        ) : (
          transactions.map((t, idx) => (
            <div
              key={t.id ?? idx}
              className="flex justify-between items-center border-t border-gray-05 pt-3 first:border-t-0 first:pt-0"
            >
              <span className="text-sm">{t.name}</span>
              <div className="text-right">
                <div className="text-sm font-semibold">${t.price}</div>
                <div className="text-xs text-gray-03">{t.date}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CardExpenseCategory;
