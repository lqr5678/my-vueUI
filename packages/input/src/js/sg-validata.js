/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @LastEditors: Seven
 */
/* 自定义校验规则 */
export function sgcustom(rule, value, callback,sgrule) {
  console.log(typeof sgrule)
  let setsgrule = {
    hintErr : "",
    uetest : ""
  }
  if(typeof sgrule === 'string'){
    setsgrule.hintErr = sgrule
  }else{
    setsgrule.hintErr = sgrule.hintErr,
    setsgrule.uetest = sgrule.uetest
  }
  if (value == '' || value == undefined || value == null) {
    callback(new Error(`${setsgrule.hintErr}不能为空`));
  } else {
    if(!setsgrule.uetest) return callback();
    if ((!setsgrule.uetest.test(value)) && value != '') {
      callback(new Error(`${setsgrule.hintErr}填写错误，请重新填写`));
    } else {
      callback();
    }
  }
}
/* 姓名 */
export function contactName(rule, value, callback) {
  const reg = /^[\u0391-\uFFE5A-Za-z]{1,120}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('姓名不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('姓名填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 验证详细地址 */
export function registerAddr(rule, value, callback) {
  const reg = /^[0-9a-zA-Z\u4E00-\u9FA5\-（）()]{1,120}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('详细地址不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('详细地址填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 验证身份证 */
export function cardId(rule, value, callback,custNoType) {
  /* 身份证和户口簿 */
  const reg31 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
  /* 军人证 */
  const reg0103 = /^[\u4e00-\u9fa5]{3}[\d]{6,29}$/
  /* 其他 */
  const reg = /^[0-9A-Za-z]{1,32}$/

  if (value == '' || value == undefined || value == null) {
      callback(new Error('身份证件不能为空'));
  }

  if(custNoType == '31' || custNoType == '0106'){
    if(!reg31.test(value)){
      callback(new Error('身份证件号码填写错误，请重新填写'));
      return;
    }
  }else if(custNoType == '0103'){
    if(!reg0103.test(value)){
      callback(new Error('身份证件号码填写错误，请重新填写'));
      return;
    }
  }else{
    if(!reg.test(value)){
      callback(new Error('身份证件号码填写错误，请重新填写'));
      return;
    }
  }
}
/* 手机号 */
export function mobile(rule, value, callback) {
  const reg = /^1[3456789]\d{9}$/ 
  if (value == '' || value == undefined || value == null) {
      callback(new Error('联系电话不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('联系电话填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 验证码 */
export function verifCode(rule, value, callback) {
  const reg = /^\d{6}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('验证码不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('验证码填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 增值税名 */
export function vatName(rule, value, callback) {
  const reg = /^.{1,50}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('增值税名不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('增值税名填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 企业名称 */
export function consName(rule, value, callback) {
  const reg = /^.{1,50}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('企业名称不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('企业名称填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 统一社会信用代码 18位数字或者大写字母组成 */
export function unifyCreditCode(rule, value, callback) {
  const reg = /^[0-9A-Z]{18}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('统一社会信用代码不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('统一社会信用代码填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 开户银行 1-50字符*/
export function depositBank(rule, value, callback) {
  const reg = /^.{1,50}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('开户银行不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('开户银行填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 银行账号 12位到23位的数字 */
export function bankAccount(rule, value, callback) {
  const reg = /^[0-9]{10,32}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('银行账号不能为空'));
  } else {
      if ((!reg.test(value)) && value != '') {
          callback(new Error('银行账号填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 联系电话 手机号 固话 */
export function telNo(rule, value, callback) {
  const reg = /^1[3456789]\d{9}$/
  const regone = /^\d{3,4}-?\d{7,8}$/
  if (value == '' || value == undefined || value == null) {
      callback(new Error('联系电话不能为空'));
  } else {
      if ((!reg.test(value)) && (!regone.test(value))) {
          callback(new Error('联系电话填写错误，请重新填写'));
      } else {
          callback();
      }
  }
}
/* 起征日期 */
export function bgnDate(rule, value, callback) {
  if (value == '' || value == undefined || value == null) {
      callback(new Error('开始起征日期不能为空'));
  } else {
      callback();
  }
}