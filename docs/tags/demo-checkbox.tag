<demo-checkbox>
  <h1 class="ui header">
    Checkbox
    <div class="sub header">A checkbox allows a user to select a value from a small set of options, often binary</div>
  </h1>

  <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2>

  <h3 class="ui header">Checkbox</h3>
  <p>A standard checkbox</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 0) }"></i>
  </div>
  <div class="ui segment { bottom: !example[0] } attached">
    <su-checkbox checkbox="{ checkbox }" ref="checkbox1">
      Make my profile visible
    </su-checkbox>
    <span class="ui tag label {teal: refs.checkbox1.checked}">{ refs.checkbox1.checked ? 'on' : 'off' }</span>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[0] } ">
    <pre><code class="prettyprint">
      <su-checkbox checkbox="{ checkbox }" ref="mycheckbox">
        Make my profile visible
      </su-checkbox>

      <!-- checkbox state example -->
      <span class="ui tag label {teal: refs.mycheckbox.checked}">{ refs.mycheckbox.checked ? 'on' : 'off' }</span>
      <script>
        this.checkbox = {
          checked: true,
          action: () => {
            // Called after checkbox is checked.
            this.results.push('mycheckbox clicked')
            this.update()
          }
        }
      </script>
    </code></pre>
  </div>

  <p>A standard checkbox with inline option</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 1) }"></i>
  </div>
  <div class="ui segment { bottom: !example[1] } attached">
    <su-checkbox checked="{ false }" action="{ checkboxClick }" ref="checkbox2">
      Make my profile visible
    </su-checkbox>
    <span class="ui tag label {teal: refs.checkbox2.checked}">{ refs.checkbox2.checked ? 'on' : 'off' }</span>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[1] } ">
    <pre><code class="prettyprint">
      <su-checkbox checked="{ false }" action="{ checkboxClick }" ref="mycheckbox">
        Make my profile visible
      </su-checkbox>

      <!-- checkbox state example -->
      <span class="ui tag label {teal: refs.mycheckbox.checked}">{ refs.mycheckbox.checked ? 'on' : 'off' }</span>

      <script>
        this.click = () => {
          this.results.push('mycheckbox clicked')
          this.update()
        }
      </script>
    </code></pre>
  </div>

  <h3 class="ui header">Radio</h3>
  <p>A checkbox can be formatted as a radio element. This means it is an exclusive option.</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code link" onclick="{ toggleExample.bind(this, 2) }"></i>
  </div>
  <div class="ui segment { bottom: !example[2] } attached">
    <su-radio name="radio1" action="{ radioClick }" value="1" checked="{ radio1 == 1 }">
      Radio choice1
    </su-radio>
    <su-radio name="radio1" action="{ radioClick }" value="2" checked="{ radio1 == 2 }">
      Radio choice2
    </su-radio>
    <span class=" ui tag label">Radio choice{ radio1 }</span>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[2] }">
    <pre><code class="prettyprint">
      <su-radio name="radio" action="{ radioClick }" value="1" checked="{ myradio == 1 }">
        Radio choice1
      </su-radio>
      <su-radio name="radio" action="{ radioClick }" value="2" checked="{ myradio == 2 }">
        Radio choice2
      </su-radio>

      <!-- radio state example -->
      <span class="ui tag label">Radio choice{ myradio }</span>

      <script>
        this.myradio = 1
        this.radioClick = val => {
          this.myradio = val
          this.update()
        }
      </script>
    </code></pre>
  </div>

  <h3 class="ui header">Slider</h3>
  <p>A checkbox can be formatted to emphasize the current selection state</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 3) }"></i>
  </div>
  <div class="ui segment { bottom: !example[3] } attached">
    <su-checkbox class="slider">
      Accept terms and conditions
    </su-checkbox>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[3] }">
    <pre><code class="prettyprint">
      <su-checkbox class="slider">
        Accept terms and conditions
      </su-checkbox>
    </code></pre>
  </div>

  <p>A checkbox can be formatted to emphasize the current selection state</p>
  <div class="ui segment secondary top attached example">
    Example
    <i class="icon code" onclick="{ toggleExample.bind(this, 4) }"></i>
  </div>
  <div class="ui segment { bottom: !example[4] } attached">
    <div class="ui form">
      <div class="grouped fields">
        <label>Outbound Throughput</label>
        <div class="field">
          <su-radio class="slider" name="throughput">
            20 mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio class="slider" name="throughput">
            10mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio class="slider" name="throughput">
            5mbps max
          </su-radio>
        </div>
        <div class="field">
          <su-radio class="slider" name="throughput">
            Unmetered
          </su-radio>
        </div>
      </div>
    </div>
  </div>
  <div class="ui segment bottom attached inverted transition { hidden: !example[4] } ">
    <pre><code class="prettyprint">
      <div class="ui form">
        <div class="grouped fields">
          <label>Outbound Throughput</label>
          <div class="field">
            <su-radio class="slider" name="throughput">
              20 mbps max
            </su-radio>
          </div>
          <div class="field">
            <su-radio class="slider" name="throughput">
              10mbps max
            </su-radio>
          </div>
          <div class="field">
            <su-radio class="slider" name="throughput">
              5mbps max
            </su-radio>
          </div>
          <div class="field">
            <su-radio class="slider" name="throughput">
              Unmetered
            </su-radio>
          </div>
        </div>
      </div>
    </code></pre>
  </div>

  <ul>
    <li each="{ result in results }">{ result }</li>
  </ul>

  <script>
        this.example = []
        this.toggleExample = index => {
          this.example[index] = !this.example[index]
        }
        this.results = []

        this.checkbox = {
          checked: true,
          action: () => {
            this.results.push('checkbox1 clicked')
            this.update()
          }
        }

        this.checkboxClick = () => {
          this.results.push('checkbox2 clicked')
          this.update()
        }

        this.radio1 = 1
        this.radioClick = val => {
          this.radio1 = val
          this.update()
        }

        this.on('mount', () => {
          PR.prettyPrint(false)
        })
  </script>
</demo-checkbox>