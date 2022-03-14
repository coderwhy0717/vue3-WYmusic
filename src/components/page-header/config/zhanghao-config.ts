export const rulesconfig = {
  phone: [
    {
      required: true,
      message: '请输入账号~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,11}$/,
      message: '账号必须是6~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '密码必须是6位以上的字母或者数字~',
      trigger: 'blur'
    }
  ],
  num: [
    {
      required: true,
      message: '请输入电话号码~',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{11,11}$/,
      message: '请输入正确的号码~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码~',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{4,4}$/,
      message: '请输入正确的验证码~',
      trigger: 'blur'
    }
  ]
}
