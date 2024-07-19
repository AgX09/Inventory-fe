import PropTypes from 'prop-types';

export default function InputText({ name, disabled = false, label = "Label" }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <label htmlFor={name} className="w-fit">
        {label + ":"}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        disabled={disabled}
        className="border border-black rounded-md flex-1 p-1"
      />
    </div>
  );
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
