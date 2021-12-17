import { signIn } from "next-auth/react";
import React from "react";

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-20 pt-48">
      <div>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.id}>
            <button
              className="text-white"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
