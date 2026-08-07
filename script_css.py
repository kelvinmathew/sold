css_content = '''
.services-accordion-new {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.service-list-item {
  display: flex;
  align-items: flex-start;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  overflow: hidden;
}

.service-list-item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.service-left {
  width: 676px;
  display: flex;
  padding: 7px 62px;
}

.service-num-col {
  width: 118px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
}

.service-num-col .num {
  font-family: "Mona Sans", var(--font-heading);
  font-weight: 500;
  font-size: 20px;
  line-height: 54px;
  color: #FFFFFF;
}

.service-num-col .vertical-line {
  position: absolute;
  right: 50px;
  top: 54px;
  bottom: 0;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-list-item.active .vertical-line {
  opacity: 1;
}

.service-content-col {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.service-content-col .title {
  font-family: "Mona Sans", var(--font-heading);
  font-weight: 500;
  font-size: 32px;
  line-height: 54px;
  color: #FFFFFF;
}

.service-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s ease;
}

.service-list-item.active .service-body {
  grid-template-rows: 1fr;
}

.service-body-inner {
  min-height: 0;
  overflow: hidden;
  padding-bottom: 20px;
}

.service-desc {
  font-family: "Inter", var(--font-body);
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
  color: #FFFFFF;
  margin-top: 10px;
  margin-bottom: 25px;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 35px 0;
}

.service-features li {
  display: flex;
  align-items: center;
  font-family: "Inter", var(--font-body);
  font-weight: 400;
  font-size: 20px;
  line-height: 14px;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.service-features li .plus-icon {
  width: 22px;
  height: 22px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-read-more-pill {
  display: inline-flex;
  align-items: center;
  background: #FFFFFF;
  border-radius: 27px;
  padding-right: 25px;
  height: 54px;
  text-decoration: none;
  width: fit-content;
}
.btn-read-more-pill:hover {
  background: #f0f0f0;
}
.btn-read-more-pill .btn-icon-orange {
  width: 44px;
  height: 44px;
  background: #FFA726;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-right: 15px;
}
.btn-read-more-pill .btn-text {
  font-family: "Inter", var(--font-body);
  font-weight: 400;
  font-size: 20px;
  color: #000;
}

.service-image-strip {
  width: 641.67px;
  height: 69.39px;
  overflow: hidden;
  margin-left: auto;
  margin-top: 1.5px;
  transition: height 0.4s ease;
}

.service-list-item.active .service-image-strip {
  height: 506.16px;
}

.service-image-strip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
'''

with open('css/style.css', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
# Replace from line 881 to 999
new_lines = lines[:880] + [css_content] + lines[999:]

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.write('\\n'.join(new_lines))

print("CSS updated")
