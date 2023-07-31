export default function Event({date, time, header, description, price}) {
  return (
    <div className="eventwrapper">
      <ul>
        <li>{date}</li>
        <span>{time}</span>
        <h3>{header}</h3>
        <span>{description}</span>
        <h4>{price}</h4> <span>per person</span>
      </ul>
    </div>
  );
}
