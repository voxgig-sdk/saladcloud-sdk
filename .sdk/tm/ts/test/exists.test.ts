
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SaladcloudSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SaladcloudSDK.test()
    equal(testsdk instanceof SaladcloudSDK, true,
      'SaladcloudSDK.test() must return a client synchronously')
  })

})
