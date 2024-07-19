import PropTypes from 'prop-types';

export default function InputDate({ name, disabled = false, label = "Date" }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <label htmlFor={name} className="w-fit">
        {label + ":"}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        disabled={disabled}
        className="border border-black rounded-md flex-1 p-1"
      />
    </div>
  );
}

InputDate.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
