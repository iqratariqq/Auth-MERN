import { Check, X } from "lucide-react";
const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At Least 6 character long", met: password.length >= 6 },

    { label: "At Least 1 Uppercase Letter", met: /[A-Z]/.test(password) },
    { label: "At Least 1 Lowercase letter", met: /[a-z]/.test(password) },
    { label: "At Least 1 Number", met: /\d/.test(password) },
    {
      label: "At Least 1 Special Character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
  return (
    <div className="mt-4 space-y-2">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-400" />
          ) : (
            <X className="size-4 text-gray-400" />
          )}
          <span className={item.met ? "text-green-500" : "text-gray-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const Passwordstringmeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match[/[[!@#$%^&*(),.?":{}|<>]]/]) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getcolor = (strength) => {
    if (strength === 0) return "bg-red-400";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-400";
    if (strength === 3) return "bg-yellow-500";
    return "bg-green-400";
  };
  const getStringText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between mb-1">
        <span className="text-gray-400 text-xs">Password</span>
        <span className="text-gray-400 text-xs">{getStringText(strength)}</span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getcolor(strength) : "bg-gray-400 flex-col"
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};

export default Passwordstringmeter;
