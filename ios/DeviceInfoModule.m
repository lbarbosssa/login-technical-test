//
//  DeviceInfoModule.m
//  LoginTechnicalTest
//
//  Created by Lucas Barbosa on 11/02/25.
//

#import "DeviceInfoModule.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>  // Para acessar as informações do dispositivo

@implementation DeviceInfoModule

// Exposição do módulo para o JavaScript
RCT_EXPORT_MODULE();

// Método que retorna a versão do iOS
RCT_EXPORT_METHOD(getIOSVersion:(RCTResponseSenderBlock)callback)
{
  NSString *iosVersion = [[UIDevice currentDevice] systemVersion];  // Obtém a versão do iOS
  callback(@[iosVersion]);  // Envia a versão para o JavaScript
}

@end

