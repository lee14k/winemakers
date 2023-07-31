import "./Homeevents.css";
import Event from "../Components/Event";
import data from "../Components/eventdata.json";

export default function Homeevents() {
  return <div className="homewrapper">{data.map((item, index)=> {
    return (
      <Event 
        key={index}
        date={item.date}
        time={item.time}
        header={item.header}
        description={item.description}
        price={item.price}
      />
    )
  })}</div>;
}
