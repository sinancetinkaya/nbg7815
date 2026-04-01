include $(TOPDIR)/rules.mk

PKG_NAME:=nbg7815_led_config
PKG_VERSION:=1.0
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/nbg7815_led_config
  SECTION:=Miscellaneous
  CATEGORY:=nbg7815
  TITLE:=NBG7815 LED Configuration
  DEPENDS:=+uci
endef

define Build/Configure
endef

define Build/Compile
endef

define Package/nbg7815_led_config/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/led_colors.config $(1)/etc/config/led_colors

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/nbg7815_led.init $(1)/etc/init.d/nbg7815_led
endef

define Package/nbg7815_led_config/postinst
#!/bin/sh
[ -z "$${IPKG_INSTROOT}" ] || exit 0
/etc/init.d/nbg7815_led enable
/etc/init.d/nbg7815_led boot
/etc/init.d/nbg7815_led start
endef

$(eval $(call BuildPackage,nbg7815_led_config))
