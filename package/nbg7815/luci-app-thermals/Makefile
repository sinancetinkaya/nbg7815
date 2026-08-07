include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-thermals
PKG_VERSION:=1.0
PKG_RELEASE:=1

PKG_MAINTAINER:=sinancetinkaya
PKG_LICENSE:=GPL-2.0

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-thermals
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=Thermal Zones status page
  DEPENDS:=+luci-base
  PKGARCH:=all
endef

define Package/luci-app-thermals/description
  Displays thermal zone temperatures under Status, with color-coded
  bars (green below 75C, yellow 75-85C, red 85C and above).
endef

define Build/Compile
endef

define Package/luci-app-thermals/install
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d
	$(INSTALL_DATA) ./root/usr/share/luci/menu.d/luci-app-thermals.json \
		$(1)/usr/share/luci/menu.d/luci-app-thermals.json

	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DATA) ./root/usr/share/rpcd/acl.d/luci-app-thermals.json \
		$(1)/usr/share/rpcd/acl.d/luci-app-thermals.json

	$(INSTALL_DIR) $(1)/www/luci-static/resources/view
	$(INSTALL_DATA) ./root/www/luci-static/resources/view/thermals.js \
		$(1)/www/luci-static/resources/view/thermals.js
endef

$(eval $(call BuildPackage,luci-app-thermals))
