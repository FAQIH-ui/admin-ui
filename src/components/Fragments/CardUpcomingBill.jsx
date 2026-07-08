import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CircularProgress from '@mui/material/CircularProgress';

// Mapping kata kunci -> komponen Icon.
// Dicocokkan ke gabungan field name/title/icon/category (case-insensitive),
// jadi tetap jalan walau API kirim field yang berbeda-beda.
const iconMap = [
  { keyword: "figma", Icon: Icon.Figma },
  { keyword: "adobe", Icon: Icon.Adobe },
  { keyword: "food", Icon: Icon.Food },
  { keyword: "housing", Icon: Icon.House },
  { keyword: "rent", Icon: Icon.House },
  { keyword: "transport", Icon: Icon.Transport },
  { keyword: "shopping", Icon: Icon.Shopping },
  { keyword: "movie", Icon: Icon.Movie },
  { keyword: "game", Icon: Icon.Gamepad },
];

function resolveIcon(item) {
  const haystack = [item.name, item.title, item.icon, item.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const match = iconMap.find((m) => haystack.includes(m.keyword));
  const IconComponent = match ? match.Icon : Icon.Bill;
  return <IconComponent />;
}

function normalizeBill(item) {
  const dateSource = item.date && item.month ? null : (item.dueDate || item.due_date || item.date);
  let month = item.month;
  let date = item.date;

  if (dateSource && !month) {
    const d = new Date(dateSource);
    if (!isNaN(d)) {
      month = d.toLocaleString("en-US", { month: "short" });
      date = d.getDate();
    }
  }

  return {
    id: item.id ?? item._id,
    month: month ?? "-",
    date: date ?? "-",
    icon: resolveIcon(item), // ⬅️ diganti, sebelumnya: item.icon ?? <Icon.Bill />
    name: item.name ?? item.title ?? "Bill",
    lastCharge: item.lastCharge ?? item.last_charge ?? "-",
    amount: item.amount ?? 0,
  };
}

function CardUpcomingBill(props) {
  const { data } = props;
  const isLoading = !data || data.length === 0;

  return (
    <>
      <Card
        title="Upcoming Bill"
        link="/bill"
        desc={
          isLoading ? (
            <div className="flex flex-col justify-center items-center h-full text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              Loading Data
            </div>
          ) : (
            <div className="flex flex-col justify-around h-full">
              {data.map(normalizeBill).map((item) => (
                <div key={item.id} className="flex justify-between pt-3 pb-3">
                  <div className="flex">
                    <div className="bg-special-bg p-4 rounded-lg flex flex-col">
                      <span className="text-xs">{item.month}</span>
                      <span className="text-2xl font-bold">{item.date}</span>
                    </div>
                    <div className="ms-10">
                      {item.icon}
                      <span className="font-bold">{item.name}</span>
                      <br />
                      <span className="text-xs">Last Charge - {item.lastCharge}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold">
                      ${item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      />
    </>
  );
}

export default CardUpcomingBill;