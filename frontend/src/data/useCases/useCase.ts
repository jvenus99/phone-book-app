export default interface UseCase<ParamsType, ReturnType> {
  execute: (params: ParamsType) => ReturnType
}