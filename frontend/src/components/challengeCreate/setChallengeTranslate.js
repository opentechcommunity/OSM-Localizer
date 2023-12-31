import React from "react";
import { Input, Select } from "../input";
import languageJson from "../../assets/json/language.json";

const translateEngineOptions = [
  { value: " ", label: "---" },
  { value: "GOOGLE", label: "Google" },
  { value: "MICROSOFT", label: "Microsoft" },
  { value: "YANDEX", label: "Yandex" },
  //   { value: "CUSTOM", label: "Custom" },
];

const languageOptions = Object.keys(languageJson).map((key) => {
  if (key === "---") {
    return { label: key, value: "" };
  }
  return { label: key, value: languageJson[key] };
});

export const TranslationForm = ({ challenge, setChallenge }) => {
  const onInputChange = (e) => {
    setChallenge({
      ...challenge,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-group">
      <Select
        label="Translate to:*"
        name="to_language"
        clearable={true}
        options={languageOptions}
        onChange={onInputChange}
        value={challenge.to_language}
      />
      <Select
        name="translate_engine"
        label="Translate Engine"
        options={translateEngineOptions}
        onChange={onInputChange}
        value={challenge.translate_engine}
      />
      {/* {props.challengeInfo.translateEngine === "custom" && (
                <div className="form-group">
                    <p className="form-label">Custom Translate Engine</p>
                    <label className="form-label">Endpoint URL</label>
                    <textarea
                        className="form-control"
                        name="customRequestSample"
                        type="text"
                        onChange={onInputChange}
                        defaultValue={props.challengeInfo.customTranslateEngineAPI}
                    />
                    <label className="form-label">Request Sample</label>
                    <textarea
                        className="form-control"
                        name="customRequestSample"
                        type="text"
                        onChange={onInputChange}
                        defaultValue={props.challengeInfo.customTranslateEngineRequest}
                    />
                    <label className="form-label">Response Header</label>
                    <input
                        className="form-control"
                        name="customResponseHeader"
                        type="text"
                        onChange={onInputChange}
                        defaultValue={props.challengeInfo.customTranslateEngineResponse}
                    />

                </div>
            )} */}

      <Input
        name="api_key"
        label="API Key"
        type="text"
        placeholder="API Key"
        onChange={onInputChange}
        defaultValue={challenge.api_key}
      />
      <p>
        How to get API keys?{" "}
        <a
          href="Google: https://cloud.google.com/translate/docs/quickstarts"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google
        </a>
        ,{" "}
        <a
          href="https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-info-overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          Microsoft
        </a>
        ,{" "}
        <a
          href="https://tech.yandex.com/translate/doc/dg/concepts/api-overview-docpage/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Yandex
        </a>
      </p>
    </div>
  );
};
