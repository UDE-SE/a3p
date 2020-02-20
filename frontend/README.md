# Frontend

## Hints

All API calls shall be declared in `/src/state/actions.jsx`.

Methods for changing the global state

* shall be declared in the constant `actions` in `/src/state/actions.jsx` and 
* must be implemented in `/src/state/reducer.jsx`.

Components inheriting from the class `ServiceComponent` in `/src/components/meta/ServiceComponent.jsx` must get passed a method as `onFinish`-prop.

## Examples

Files containing example implementations:
* `/src/components/example/SecondPage.jsx`
* `/src/components/example/TemperaturePage.jsx`
* `/src/components/layout/PageWrapper.jsx`
* `/src/state/actions.jsx`