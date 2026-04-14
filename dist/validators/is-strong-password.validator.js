"use strict";
// @ai-generated — GitHub Copilot (Claude Opus 4.6)
/**
 * Copyright (c) 2026 SandBox
 * Licensed under the MIT License.
 * https://github.com/sandbox-it-solutions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsStrongPassword = IsStrongPassword;
const class_validator_1 = require("class-validator");
function IsStrongPassword(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isStrongPassword',
            target: object.constructor,
            propertyName,
            options: {
                message: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character',
                ...validationOptions,
            },
            validator: {
                validate(value) {
                    if (typeof value !== 'string')
                        return false;
                    if (value.length < 8)
                        return false;
                    if (!/[A-Z]/.test(value))
                        return false;
                    if (!/[a-z]/.test(value))
                        return false;
                    if (!/\d/.test(value))
                        return false;
                    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(value))
                        return false;
                    return true;
                },
            },
        });
    };
}
//# sourceMappingURL=is-strong-password.validator.js.map