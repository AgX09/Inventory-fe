import PropTypes from 'prop-types';

export default function InputQuantity({ name, disabled = false, label = "Quantity", defaultValue = 0 }) {
  return (
    <div className="flex gap-2">
      <label htmlFor={name} className="w-fit">
        {label + ":"}
      </label>
      <input
        type="number"
        id={name}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        className="border border-black rounded-md flex-1 px-2 py-1"
      />
    </div>
  );
}

InputQuantity.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  defaultValue: PropTypes.number,
};
